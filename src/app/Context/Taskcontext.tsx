  "use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { Task } from '../Type/Task';
import * as taskService from '../Service/Service';

interface TaskContextType {
  tasks: Task[];
  addTask: (taskData: Task) => void;
  toggleTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    taskService.getTasks().then(setTasks);
  }, []);

  const addTask = async (taskData: Omit<Task, 'id' | 'completed'>) => {
    const newTask = await taskService.addTask({
      title: taskData.title,
      name: taskData.name,
      description: taskData.description,
      category: taskData.category
    });
    setTasks((prev) => [{ ...taskData, ...newTask }, ...prev]);
  };

  const toggleTask = async (task: Task) => {
    const updatedTask = await taskService.toggleTask(task);
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? updatedTask : t))
    );
  };

  const deleteTask = async (id: string) => {
    await taskService.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used inside TaskProvider');
  return context;
};
