import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { query, collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useParams, useSearchParams } from 'react-router-dom';

const statuses = { Completed: 'text-green-400 bg-green-400/10', Error: 'text-rose-400 bg-rose-400/10' }
const activityItems = [
  {
    user: {
      name: 'Software Developer',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: 'Redi Software',
    branch: 'WA',
    status: 'Completed',
    duration: '25s',
    date: '45 minutes ago',
    dateTime: '2023-01-23T11:00',
  },
  // More items...
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function UserPendingApplicationsComponent() {

  const [searchParams] = useSearchParams(); //gets the URL params after the ? mark
  const userId = searchParams.get('user')

  const [user, setUser] = useState(null);
  const [submission, setSubmission] = useState([]);

  const [fieldValues, setFieldValues] = useState([]);
  const [submissionUser, setSubmissionUser] = useState([]);

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
        const submissionDoc = doc(db, 'formInstances', params.instanceId, 'submissions', params.submissionId); //getting the answers + questions
        const userDoc = doc(db, 'users', userId)

        const querySnapshot = await getDoc(submissionDoc);
        if (querySnapshot.exists()) {
          const submissionData = querySnapshot.data();
          setSubmission(submissionData);
          setFieldValues(submissionData.fields);
        }

        const queryUserSnapshot = await getDoc(userDoc);
        if (queryUserSnapshot.exists()) {
          const userData = queryUserSnapshot.data();
          setSubmissionUser(userData);
        }

      };
      fetchData();
    }
  }, [user]);

  return (
    <>
      {/* Activity list */}
      <div className="border-t border-white/10 pt-11">
        <h2 className="px-4 text-base font-semibold leading-7 text-gray-900 sm:px-6 lg:px-8">Submitted Applications</h2>
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
                Company
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
                Remind
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {activityItems.map((item) => (
              <tr key={item.commit}>
                <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                  <div className="flex items-center gap-x-4">
                    <img src={item.user.imageUrl} alt="" className="h-8 w-8 rounded-full bg-gray-800" />
                    <div className="truncate text-sm font-medium leading-6 text-gray-900">{item.user.name}</div>
                  </div>
                </td>
                <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                  <div className="flex gap-x-3">
                    <div className="truncate text-sm font-medium leading-6 text-gray-900">{item.commit}</div>
                    <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20">
                      {item.branch}
                    </span>
                  </div>
                </td>
                <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                  <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                    <time className="text-gray-400 sm:hidden" dateTime={item.dateTime}>
                      {item.date}
                    </time>
                    <div className={classNames(statuses[item.status], 'flex-none rounded-full p-1')}>
                      <div className="h-1.5 w-1.5 rounded-full bg-current" />
                    </div>
                    <div className="hidden text-gray-900 sm:block">{item.status}</div>
                  </div>
                </td>
                <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
                  {item.duration}
                </td>
                <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                  <time dateTime={item.dateTime}>{item.date}</time>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
)}


export default UserPendingApplicationsComponent;