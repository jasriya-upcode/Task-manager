'use client';

import { useState } from 'react';
import { Task } from './Type/Task';
import { useTasks } from '@/app/Context/Taskcontext';
import TaskList from '@/app/Components/Tasklist/Tasklist';

interface TaskFormData {
  title: string;
  name: string;
  description: string;
  category: string;
}

export default function TaskPage() {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    name: '',
    description: '',
    category: ''
  });
  
  const { addTask } = useTasks();

  const handleAdd = () => {
    if (formData.title.trim()) {
      const newTask: Task = {
        ...formData,
        id: '', 
        completed: false
      };
      addTask(newTask);
      setFormData({
        title: '',
        name: '',
        description: '',
        category: ''
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">📝 Taskist</h1>

      <div className="mb-12 space-y-8 p-8 bg-white rounded-xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">Task Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter task title"
              className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md text-black"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md text-black"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-800">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter task description"
            className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[120px] shadow-sm hover:shadow-md text-black"
            rows={3}
            required
          />
        </div>
        
        <div className="grid grid-cols-1">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md text-black"
              required
            >
              <option value="">Select a category</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="shopping">Shopping</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
          <div>
            <button 
              onClick={handleAdd} 
              className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={!formData.title.trim()}
            >
              Add Task
            </button>
          </div>
        </div>

      <TaskList />
    </div>
  );
}
