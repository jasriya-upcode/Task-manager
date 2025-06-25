import { useState } from 'react';
import { useTasks } from '@/app/Context/Taskcontext';
import TaskItem from '../Taskitem/Taskitem';

const ITEMS_PER_PAGE = 10;

const TaskList = () => {
  const { tasks } = useTasks();
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  const showMoreItems = () => {
    setVisibleItems(prev => prev + ITEMS_PER_PAGE);
  };

  const visibleTasks = tasks.slice(0, visibleItems);
  const hasMore = tasks.length > visibleItems;

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-left">Completed</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {visibleTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
      
      {hasMore && (
        <div className="flex justify-center mt-4">
          <button
            onClick={showMoreItems}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
