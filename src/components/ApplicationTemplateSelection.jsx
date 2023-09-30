import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig'; // Replace with your actual import
import { collection, getDocs } from 'firebase/firestore';

function ApplicationTemplateSelection() {
  const [templates, setTemplates] = useState([]);

  const fetchTemplates = async () => {
    const templatesCollection = collection(db, 'formTemplates');
    const templateSnapshot = await getDocs(templatesCollection);
    const templatesList = templateSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTemplates(templatesList);
    console.log(templatesList)
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <div>
      <h1>Select a Template</h1>
      <ul>
        {templates.map((template) => (
          <li key={template.id}>
            <a href={`/create-form/${template.id}`}>{template.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApplicationTemplateSelection