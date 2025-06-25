import { useState } from 'react';
import { Task } from '@/app/Type/Task';
import { useTasks } from '@/app/Context/Taskcontext';

const TaskItem = ({ task }: { task: Task }) => {
  const { toggleTask, deleteTask } = useTasks();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteTask(task.id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <tr className="border-b border-gray-600 text-white hover:bg-gray-700">
        <td className="p-2">{task.id}</td>
        <td className="p-2">{task.title || 'N/A'}</td>
        <td className="p-2">{task.name || 'N/A'}</td>
        <td className="p-2">{task.description || 'N/A'}</td>
        <td className="p-2">{task.category || 'N/A'}</td>
        <td className="p-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task)}
            className="h-4 w-4"
          />
        </td>
        <td className="p-2">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-black font-bold py-1 px-3 rounded"
          >
            Delete
          </button>
        </td>
      </tr>
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-black">Confirm Deletion</h3>
            <p className="mb-6 text-black">Are you sure you want to delete this task?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-black-300 rounded text-black hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskItem;
