"use client";
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<{ description: string; category: string }[]>([]);

  const addTask = async () => {
    if (task.trim() === '') return;

    const response = await axios.post('/api/suggest-category', { description: task });
    const category = response.data.category;
    setTasks([...tasks, { description: task, category }]);
    setTask('');
  };

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
        <div className="w-full max-w-md p-4 bg-white rounded shadow">
          <h1 className="text-2xl font-bold mb-4">AI-Enhanced To-Do List</h1>
          <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="border p-2 w-full mb-4"
              placeholder="Enter a task"
          />
          <button
              onClick={addTask}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Task
          </button>
          <ul className="mt-4">
            {tasks.map((task, index) => (
                <li key={index} className="border p-2 mt-2 rounded flex justify-between items-center">
                  <span>{task.description}</span>
                  <span className="text-gray-500">{task.category}</span>
                </li>
            ))}
          </ul>
        </div>
      </main>
  );
}
