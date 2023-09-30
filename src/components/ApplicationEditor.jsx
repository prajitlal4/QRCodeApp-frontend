import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

function ApplicationEditor() {
  const { templateId } = useParams();

  const [template, setTemplate] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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
    <div>
      <form onSubmit={handleSubmit}>
        <h1>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        </h1>
        <p>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        </p>

        {/* Display non-editable fields */}
        {template.fields.map((field, index) => (
          <div key={index}>
            <label>{field.label}</label>
            <input type={field.type} defaultValue={field.defaultValue} readOnly />
          </div>
        ))}

        {/* Submit Button */}
        <button type="submit">Create Form</button>
      </form>
    </div>
  );
}

export default ApplicationEditor;
