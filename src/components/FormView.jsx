import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function FormView() { //allows user to edit application, only title and description for now
  const { instanceId } = useParams();

  const [instance, setInstance] = useState(null);
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState(0);

  const [submissionCount, setSubmissionCount] = useState(0); //setting states, maybe better to manage?
  const [fields, setFields] = useState([]);

  useEffect(() => { //checks to see if user is logged on before trying to load component, to stop null value from rendering
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    // Clean up subscription on component unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log(user)
    if (user) {
      const fetchInstance = async () => {
        try {
          const instanceDoc = doc(db, 'formInstances', instanceId);
          const instanceSnapshot = await getDoc(instanceDoc);

          if (instanceSnapshot.exists()) {
            const instanceData = instanceSnapshot.data();
            setInstance(instanceData);
            setSubmissionCount(instanceData.submissionCount);
            setFields(instanceData.fields)
            setTitle(instanceData.title); // Set initial title and description values
            setDescription(instanceData.description);
            setSalary(instanceData.salary)

            console.log(instanceData)
          }
        } catch (e) {
          console.error('Error fetching instance:', e);
        }
      };
    fetchInstance();
    }
  }, [instanceId, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser; //gets current user details for storing alongside form instance

    // Check if the user is not logged in
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    try {
      const formSubmission = await addDoc(collection(db, 'formSubmissions'), {
        instanceId,
        submissionCount: submissionCount + 1,
        fields: fields,
        userId: user.uid
      });
      alert(`Form submitted!`);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  if (!instance) return <p>Loading...</p>;

  return (
    <div className="py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Job Application Form</h1>
      <form>
      <div className="space-y-12">
        <div className=" grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3 mt-6">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">Position Information</h2>
          </div>
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="sm:col-span-4">
              <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                Job Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    value={title} readOnly placeholder="Title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                Job Description
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <textarea
                    value={description} readOnly placeholder="Description"
                    rows={3}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                Salary
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <span className="pl-2 pt-1.5">$</span>
                  <input
                    inputMode="numeric"
                    pattern="\d*"
                    value={salary} readOnly type="text"
                    placeholder="Enter amount"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">Fill out the following fields</h2>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            {instance.fields.map((field, index) => (
              <div className="sm:col-span-3" key={index}>
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  {field.label}
                </label>
                <div className="mt-2">
                  <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Submit Button */}
        <button className="bg-purple-300 p-1 rounded font-bold"type="submit" onClick={handleSubmit}>Submit Application</button>
      </div>
    </form>
    </div>
  );
}

export default FormView;
