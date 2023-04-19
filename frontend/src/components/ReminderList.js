
// This component will be responsible for fetching reminders from the REST API and displaying them in a list.

import React, { useState } from 'react';

function ReminderList({ reminders, deleteReminder, editReminder }) {
  const [completed, setCompleted] = useState({});

  const toggleCompleted = (id, isChecked) => {
    setCompleted((prevState) => ({
      ...prevState,
      [id]: isChecked,
    }));
  };

  return (
    <div id="container">
      {reminders.map((reminder) => (
        <div
          key={reminder._id}
          className="reminder-item"
          style={{ textDecoration: completed[reminder._id] ? 'line-through' : 'none' }}
        >
          <input
            type="checkbox"
            onChange={(e) => {
              toggleCompleted(reminder._id, e.target.checked);
            }}
          />
          <details>
            <summary>{reminder.title}</summary>
            <p>Description: {reminder.description}</p>
            <p>Created Date: {new Date(reminder.createdDate).toLocaleDateString()}</p>
            <p>
              Last Modified Date:{' '}
              {reminder.lastModifiedDate
                ? new Date(reminder.lastModifiedDate).toLocaleDateString()
                : 'Not available'}
            </p>
            <p>Due Date: {new Date(reminder.dueDate).toISOString().split('T')[0]}</p>
          </details>
          <button onClick={() => editReminder(reminder)}>Edit</button>
          <button onClick={() => deleteReminder(reminder._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ReminderList;
