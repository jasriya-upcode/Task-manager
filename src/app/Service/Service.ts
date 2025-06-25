import { Task } from "../Type/Task";

const API_URL = 'https://685a56269f6ef9611155f20d.mockapi.io/Task';

export const getTasks = async (): Promise<Task[]> => {
  const res = await fetch(API_URL);
  return res.json();
};

export const addTask = async (taskData: Omit<Task, 'id' | 'completed'>): Promise<Task> => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...taskData, completed: false }),
  });
  return res.json();
};

export const toggleTask = async (task: Task): Promise<Task> => {
  const res = await fetch(`${API_URL}/${task.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...task, completed: !task.completed }),
  });
  return res.json();
};

export const deleteTask = async (id: string): Promise<void> => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};
