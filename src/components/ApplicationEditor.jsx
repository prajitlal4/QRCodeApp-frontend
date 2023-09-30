import React, { useState } from 'react';
import { db } from '../firebaseConfig'; // Replace with your actual import

function ApplicationEditor({ templateId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formInstanceRef = await db.collection('formInstances').add({
      title,
      description,
      templateId,
    });
    alert(`Form created! Link: /form/${formInstanceRef.id}`);
  };

  return (
    <div>
      <h1>Create Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Description
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default ApplicationEditor