
import React, { useState, useEffect } from 'react';
import ReminderList from './components/ReminderList';
import ReminderForm from './components/ReminderForm';
// import './App.css';
import './scss/main.css';

function App() {
  const [reminders, setReminders] = useState([]);
  const [editingReminder, setEditingReminder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/reminders');
      if (response.status === 200) {
        const data = await response.json();
        setReminders(data);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addReminder = async (newReminder) => {
    try {
      const response = await fetch('http://localhost:3000/reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReminder),
      });

      if (response.status === 201) {
        const reminder = await response.json();
        setReminders([...reminders, reminder]);
      } else {
        throw new Error('Failed to add reminder');
      }
    } catch (error) {
      console.error('Error adding reminder:', error);
    }
  };

  const updateReminder = async (updatedReminder) => {
    try {
      const response = await fetch(`http://localhost:3000/reminders/${updatedReminder.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReminder),
      });

      if (response.status === 200) {
        const reminder = await response.json();
        setReminders(reminders.map((r) => (r._id === reminder._id ? reminder : r)));
        setEditingReminder(null);
      } else {
        throw new Error('Failed to update reminder');
      }
    } catch (error) {
      console.error('Error updating reminder:', error);
    }
  };

  const deleteReminder = async (reminderId) => {
    try {
      const response = await fetch(`http://localhost:3000/reminders/${reminderId}`, {
        method: 'DELETE',
      });

      if (response.status === 204) {
        setReminders(reminders.filter((reminder) => reminder._id !== reminderId));
      } else {
        throw new Error('Failed to delete reminder');
      }
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  const editReminder = (reminder) => {
    setEditingReminder(reminder);
    setShowModal(true);
  };

  return (
    <div className="App">
      <div className="App-left">
        <button id="import" onClick={fetchData}>
          Import
        </button>
        <button id="add" onClick={() => setShowModal(true)}>
          Add
        </button>
      </div>
      <div className="App-right">
        <h1>Reminders</h1>
        <div className='reminder'>
        <ReminderList
          reminders={reminders}
          deleteReminder={deleteReminder}
          editReminder={editReminder}
        />
        <ReminderForm
          showModal={showModal}
          setShowModal={setShowModal}
          addReminder={addReminder}
          updateReminder={updateReminder}
          editingReminder={editingReminder}
        />
        </div>
      </div>
    </div>
  );
  
}

export default App;
