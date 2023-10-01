import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

function ApplicationEditor() { //allows user to edit application, only title and description for now
  const { templateId } = useParams();

  const [template, setTemplate] = useState(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState(0);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const templateDoc = doc(db, 'formTemplates', templateId);
        const templateSnapshot = await getDoc(templateDoc);

        if (templateSnapshot.exists()) {
          const templateData = templateSnapshot.data();
          setTemplate(templateData);
          setTitle(templateData.title); // Set initial title and description values
          setDescription(templateData.description);
        }
      } catch (e) {
        console.error('Error fetching template:', e);
      }
    };

    fetchTemplate();
  }, [templateId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formInstanceRef = await addDoc(collection(db, 'formInstances'), {
      title,
      description,
      templateId,
    });
    alert(`Form created! Link: /form/${formInstanceRef.id}`);
  };

  if (!template) return <p>Loading...</p>;

  return (
    <div className="py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Application Editor</h1>
      <form>
      <div className="space-y-12">
        <div className=" grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3 mt-6">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">Position Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Provide details about the position available at your business.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="sm:col-span-4">
              <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                Job Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title"
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
                    value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"
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
                    value={salary} onChange={(e) => setSalary(e.target.value.replace(/\D/,''))} type="text"
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
            <h2 className="text-base font-semibold leading-7 text-gray-900">Form Fields</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">These are the fields which the user will see and is able to fill out.</p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            {template.fields.map((field, index) => (
              <div className="sm:col-span-3" key={index}>
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  {field.label}
                </label>
                <div className="mt-2">
                  <input
                    defaultValue={field.defaultValue}
                    readOnly
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Submit Button */}
        <button type="submit" onClick={handleSubmit}>Create Form</button>
      </div>
    </form>
    </div>
  );
}

export default ApplicationEditor;
