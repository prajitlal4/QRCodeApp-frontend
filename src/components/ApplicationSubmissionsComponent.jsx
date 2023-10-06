import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { query, collection, getDocs, getDoc, doc, documentId } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useParams } from 'react-router-dom';
import ApplicantStatusDropDownComponent from './ApplicantStatusDropDownComponent';

function ApplicationSubmissionsComponent() {

  const { instanceId } = useParams();

  const [user, setUser] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => { //checks to see if user is logged on before trying to load component, to stop null value from rendering
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    // Clean up subscription on component unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => { //grabs all submissions from the database which contains the instanceId passed in through parameter
    if (user) {
      const fetchData = async () => {
      const q = query(collection(db, 'formInstances', instanceId, 'submissions'));
      const querySnapshot = await getDocs(q);

      const submissionsWithUserDetails = [];

      for (let document of querySnapshot.docs) {
        const submissionData = document.data();
        console.log(querySnapshot)
        const userDoc = await getDoc(doc(db, 'users', submissionData.userId));
        const userData = userDoc.data();

        submissionsWithUserDetails.push({
          ...submissionData,
          userEmail: userData.email,
          userFName: userData.firstName,
          userLName: userData.lastName,
          submissionId: document.id,
          // add more fields as needed
          });
      }
      setSubmissions(submissionsWithUserDetails);
    };

    fetchData();
    }
  }, [user]);

  return (
    <div className="min-h-full">
      <div className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">JOB TITLE</h1>
          <div className="border-t border-white/10 pt-11">
            <div className="text-base font-semibold leading-7 text-gray-900 flex">
              <h2>Submissions</h2>
            </div>
            <div className="-mx-4 mt-8 sm:-mx-0">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Name
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                    >
                      Responses
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
                  {submissions.map((submission, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {submission.userFName} {submission.userLName}
                      </td>
                      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                        {submission.userEmail}
                      </td>
                      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                        <a className="bg-purple-300 rounded px-3" href={`/submissions/${instanceId}/responses/${submission.submissionId}?user=${submission.userId}`}>View</a>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <ApplicantStatusDropDownComponent />
                      </td>
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
  </div>
  )
}

export default ApplicationSubmissionsComponent