import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { query, collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useParams, useSearchParams } from 'react-router-dom';
import { PaperClipIcon } from '@heroicons/react/20/solid'

export default function ApplicantInformationComponent() {

  const params = useParams();

  const [searchParams] = useSearchParams(); //gets the URL params after the ? mark
  const userId = searchParams.get('user')

  const [user, setUser] = useState(null);
  const [submission, setSubmission] = useState(null);

  const [fieldValues, setFieldValues] = useState([]);

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

        const querySnapshot = await getDoc(submissionDoc);
        if (querySnapshot.exists()) {
          const submissionData = querySnapshot.data();
          setSubmission(submissionData);
          setFieldValues(submissionData.fields);
          console.log(fieldValues)
        }
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
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Margot Foster</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Application for</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Backend Developer</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Salary expectation</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">About</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                    qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
                    pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
                  <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                      <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                        <div className="flex w-0 flex-1 items-center">
                          <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                            <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Download
                          </a>
                        </div>
                      </li>
                      <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                        <div className="flex w-0 flex-1 items-center">
                          <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                            <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Download
                          </a>
                        </div>
                      </li>
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}