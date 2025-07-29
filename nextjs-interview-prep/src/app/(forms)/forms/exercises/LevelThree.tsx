// components/forms/Level3DynamicForm.jsx
"use client";

import { useState } from 'react';

export default function Level3DynamicForm() {
  const [formData, setFormData] = useState({
    project: '',
    tasks: [{ id: Date.now(), name: '', time: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTaskChange = (id, e) => {
    const { name, value } = e.target;
    // TODO: Update the specific task in the tasks array
    // COMPLETE THIS - use map to find and update the correct task

    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.map(task => 
        // YOUR LOGIC HERE
        task.id === id ? { ...task, [name]: value } : task
      )
    }));
  };

  const addTask = () => {
    // TODO: Add a new task to the tasks array
    // COMPLETE THIS - use spread operator to add new task with unique id
    setFormData(prev => ({
      ...prev,
      tasks: [
        // YOUR LOGIC HERE
        ...prev.tasks,
        { id: Date.now(), name: '', time: '' }
      ]
    }));
  };

  const removeTask = (id) => {
    // TODO: Remove task from array, but only if more than 1 task exists
    // COMPLETE THIS - use filter to remove the task with matching id
    if (formData.tasks.length > 1) {

      const newTasks = formData.tasks.filter(task => task.id !== id);

      setFormData((prev) => ({
        ...prev,
        tasks: newTasks,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Project submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Level 3: Dynamic Fields</h2>

      <div>
        <label className="block mb-1">Project Name:</label>
        <input
          type="text"
          name="project"
          value={formData.project}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Tasks:</h3>
          <button
            type="button"
            onClick={addTask}
            className="bg-green-500 text-white px-2 py-1 rounded text-sm"
          >
            Add Task
          </button>
        </div>

        {formData.tasks.map((task, index) => (
          <div
            key={task.id}
            className="grid grid-cols-[1fr_120px_auto] gap-2 mb-2 items-end"
          >
            <div>
              <label className="block mb-1">Task Name:</label>
              <input
                type="text"
                name="name"
                value={formData.tasks[index]?.name}
                onChange={(e) => handleTaskChange(task.id, e)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Task time(hrs):</label>
              <input
                type="number"
                name="time"
                min="0"
                value={formData.tasks[index]?.time}
                onChange={(e) => handleTaskChange(task.id, e)}
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              type="button"
              onClick={() => removeTask(task.id)}
              className="bg-red-500 text-white px-2 py-1 rounded text-sm"
            >
              Remove task
            </button>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create Project
      </button>
    </form>
  );
}
