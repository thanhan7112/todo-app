import React from 'react';
import Task from '../task/Task';
import './TaskList.css'

interface TaskListProps {
  tasks: { id: number; text: string }[];
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit }) => {
  return (
    <div className='task-list-container'>
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          text={task.text}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;
