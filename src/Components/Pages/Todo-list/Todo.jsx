import React, { useState, useEffect } from 'react';
import Navbar from '../../Navbar/Navbar';
import './Todo.css'; // If you want to use custom styles for this page

const Todo = () => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const allUsers = JSON.parse(localStorage.getItem('users')) || [];
  const [todos, setTodos] = useState(currentUser ? currentUser.todos : []);
  const [newTask, setNewTask] = useState('');
  const updateLocalStorage = (newTodos) => {
    currentUser.todos = newTodos;
    localStorage.setItem('user', JSON.stringify(currentUser));
    const updatedUsers = allUsers.map((user) => 
      user.username === currentUser.username ? currentUser : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const addTask = () => {
    if (newTask.trim()) {
      const updatedTodos = [...todos, newTask];
      setTodos(updatedTodos);
      setNewTask('');
      updateLocalStorage(updatedTodos);
    }
  };

  const removeTask = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    updateLocalStorage(updatedTodos);
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser) {
      setTodos(currentUser.todos);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="todo-container">
        <h1 className="todo-heading">Todo List</h1>
        <div className="todo-form-container">
          <input
            type="text"
            placeholder="Enter a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="todo-input"
          />
          <button onClick={addTask} className="todo-add-button">
            Add Task
          </button>
        </div>

        {todos.length > 0 ? (
          <ul className="todo-list">
            {todos.map((task, index) => (
              <li key={index} className="todo-item">
                <span>{task}</span>
                <button 
                  className="todo-remove-button" 
                  onClick={() => removeTask(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-tasks">No tasks yet. Add a task!</p>
        )}
      </div>
    </div>
  );
};

export default Todo;
