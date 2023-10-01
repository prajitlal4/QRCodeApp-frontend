import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { query, where, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function BusinessCurrentApplicationsComponent() {

  const [formInstances, setFormInstances] = useState([]);

  const [user, setUser] = useState(null);

  useEffect(() => { //checks to see if user is logged on before trying to load component, to stop null value from rendering
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    // Clean up subscription on component unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const q = query(collection(db, 'formInstances'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const instances = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFormInstances(instances);
      };
      fetchData();
    }
  }, [user]);

  return (
    <>
      {/* Activity list */}
      <div className="border-t border-white/10 pt-11">
        <div className="text-base font-semibold leading-7 text-gray-900 flex">
          <h2>Current Applications</h2>
          <ul>
            <a className="bg-purple-300 rounded mx-5 px-3" href="/template-selection">Add new</a>
          </ul>
        </div>
        <table className="mt-6 w-full whitespace-nowrap text-left">
          <colgroup>
            <col className="w-full sm:w-4/12" />
            <col className="lg:w-4/12" />
            <col className="lg:w-2/12" />
            <col className="lg:w-1/12" />
            <col className="lg:w-1/12" />
          </colgroup>
          <thead className="border-b border-white/10 text-sm leading-6 text-gray-900">
            <tr>
              <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
                Job Title
              </th>
              <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">
                Applicants
              </th>
              <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">
                Status
              </th>
              <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">
                Last Activity
              </th>
              <th
                scope="col"
                className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
              >
                
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {formInstances.map((instance) => (
              <tr key={instance.id}>
                <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                  <div className="flex items-center gap-x-4">
                    <div className="truncate text-sm font-medium leading-6 text-gray-900">{instance.title}</div>
                  </div>
                </td>
                <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                  <div className="flex gap-x-3">
                    <div className="truncate text-sm font-medium leading-6 text-gray-900">{instance.salary}</div>
                    <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20">
                      WIP
                    </span>
                  </div>
                </td>
                <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                  <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                    <time className="text-gray-400 sm:hidden">
                      WIP
                    </time>
                    <div className="hidden text-gray-900 sm:block">WIP</div>
                  </div>
                </td>
                <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
                WIP
                </td>
                <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                  <time>WIP</time>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
)}


export default BusinessCurrentApplicationsComponent;