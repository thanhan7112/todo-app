import React, { useState, useEffect } from 'react';
import TaskList from './components/task-list/TaskList';
import './App.css'

const App: React.FC = () => {

  const [tasks, setTasks] = useState<{ id: number; text: string }[]>(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    return storedTasks;
  });

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleAddTask = () => {
    const newTask = { id: Date.now(), text: `New item ${tasks.length + 1}` };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleDeleteAllTask = () => {
    setTasks([]);
  };

  const handleEditTask = (id: number, newText: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  };

  const handleSortTasks = () => {
    const sortedTasks = [...tasks].sort((a, b) =>
      sortOrder === 'asc' ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text)
    );
    setTasks(sortedTasks);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortTasksByTime = () => {
    const sortedTasks = [...tasks].sort((a, b) =>
      sortOrder === 'asc' ? a.id - b.id : b.id - a.id
    );
    setTasks(sortedTasks);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className='container'>
      <div className='header-todo-app'>
        <h1 className='header__title'>To-do List</h1>
        <div className='header__action'>
          <button className='action__add action' onClick={handleAddTask}>Add Task</button>
          <button className='action__add action' onClick={handleSortTasks}>Sort Tasks</button>
          <button className='action__add action' onClick={handleSortTasksByTime}>Sort Tasks By Time</button>
          <button className='action__add action' onClick={handleDeleteAllTask}>Delete All</button>
        </div>
      </div>
      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />
    </div>
  );
};

export default App;
