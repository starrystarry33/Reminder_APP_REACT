import React, { useState, useEffect } from 'react';

function ReminderForm({ showModal, setShowModal, addReminder, updateReminder, editingReminder }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (editingReminder) {
      setTitle(editingReminder.title);
      setDesc(editingReminder.description);
      setDate(new Date(editingReminder.dueDate).toISOString().substring(0, 10));
    } else {
      setTitle('');
      setDesc('');
      setDate('');
    }
  }, [editingReminder]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === '' || date === '') {
      alert('Please fill in the required fields.');
      return;
    }

    const dueDate = new Date(date + 'T00:00:00.000Z');
    const reminderData = {
      title,
      description: desc,
      dueDate,
    };

    if (editingReminder) {
      updateReminder({ ...reminderData, id: editingReminder._id });
    } else {
      addReminder(reminderData);
    }

    setShowModal(false);
    setTitle(''); 
    setDesc(''); 
    setDate('');
  };

  // if (!showModal) {
  //   return null;
  // }

  return (
    <div id="myModal" className={showModal ? "modal" : "modal hidden"}>
      <div className="modal-content">
        <span className="close" onClick={() => setShowModal(false)}>
          &times;
        </span>
        <form onSubmit={handleSubmit} className="reminder-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input"/>
          </div>
          <div className="form-group">
            <label htmlFor="desc" className="form-label">Description</label>
            <input type="text" id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} className="form-input"/>
          </div>
          <div className="form-group">
            <label htmlFor="date" className="form-label">Due Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-input"
            />
          </div>
          <button id="submit" type="submit" className="submit-btn">
            {editingReminder ? 'Update Reminder' : 'Add Reminder'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReminderForm
