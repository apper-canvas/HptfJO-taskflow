import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { moveTask } from '../features/tasksSlice';
import Column from './Column';
import AddTaskForm from './AddTaskForm';
import { Plus } from 'lucide-react';

const Dashboard = () => {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const columns = useSelector((state) => state.tasks.columns);
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If no destination, do nothing
    if (!destination) return;

    // If dropped in the same position, do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Move the task in the state
    dispatch(
      moveTask({
        taskId: draggableId,
        sourceColumnId: source.droppableId,
        sourceIndex: source.index,
        destinationColumnId: destination.droppableId,
        destinationIndex: destination.index,
      })
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Task Board</h1>
        <button
          onClick={() => setShowAddTaskForm(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <Plus size={18} />
          <span>Add Task</span>
        </button>
      </div>

      {showAddTaskForm && (
        <AddTaskForm onClose={() => setShowAddTaskForm(false)} />
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(columns).map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={column.taskIds.map((taskId) => tasks[taskId]).filter(Boolean)}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Dashboard;