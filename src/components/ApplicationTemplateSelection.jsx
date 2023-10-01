import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig'; // Replace with your actual import
import { collection, getDocs } from 'firebase/firestore';

function ApplicationTemplateSelection() { //allows business user to select the template
  const [templates, setTemplates] = useState([]);

  const fetchTemplates = async () => { //loads a list of templates
    const templatesCollection = collection(db, 'formTemplates');
    const templateSnapshot = await getDocs(templatesCollection);
    const templatesList = templateSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTemplates(templatesList);
    console.log(templatesList)
  };

  useEffect(() => { //done at component mount
    fetchTemplates();
  }, []);

  return (
    <div className="min-h-full">
      <div className="py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Application Creator</h1>
        <div className="border-t border-white/10 pt-11">
          <div className="px-4 text-base sm:px-6 lg:px-8"> 
            <h2 className="text-base font-semibold leading-7 text-gray-900">Select Template</h2>
            <ul className='mt-6'>
              {templates.map((template) => (
                <li key={template.id}>
                  <a className="truncate text-sm font-medium leading-6 text-gray-900" href={`/create-form/${template.id}`}>{template.title}</a>
                </li>
              ))}
            </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationTemplateSelection