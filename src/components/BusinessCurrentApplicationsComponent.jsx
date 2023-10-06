import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { query, where, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import StatusDropDownComponent from './ApplicantStatusDropDownComponent';

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
        <div className="-mx-4 mt-8 sm:-mx-0">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Job Title
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Applicants
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Salary
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {formInstances.map((instance) => (
              <tr key={instance.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                  {instance.title}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:table-cell">
                  {instance.submissionCount}
                  <a className="bg-purple-300 rounded mx-5 px-3" href={`/submissions/${instance.id}`}>View</a>
                </td>
                <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  $ {instance.salary}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><StatusDropDownComponent /></td>
                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </>
)}


export default BusinessCurrentApplicationsComponent;