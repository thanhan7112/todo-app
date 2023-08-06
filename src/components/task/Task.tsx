import React, { useState } from 'react';
import './Task.css'

interface TaskProps {
  id: number;
  text: string;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

const Task: React.FC<TaskProps> = ({ id, text, onDelete, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  const handleEdit = () => {
    onEdit(id, newText);
    setEditing(false);
  };

  return (
    <div className='task-container'>
      {editing ? (
        <div className='task__item'>
          <div className='task__content'>
            <input
            className='input-text'
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
          </div>
          <div className='task-action'>
            <button className='task-button action right' onClick={handleEdit}>Save</button>
          </div>
        </div>
      ) : (
        <div className='task__item'>
          <div className='task__content'>
            <p className='content__text'>{text}</p>
          </div>
          <div className='task-action'>
            <button className='task-button action' onClick={() => setEditing(true)}>Edit</button>
            <button className='task-button action' onClick={() => onDelete(id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
