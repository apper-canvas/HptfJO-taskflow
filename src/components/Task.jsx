import { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Calendar, Clock, Tag } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskCompletion } from '../features/tasksSlice';

// Task component with proper Draggable implementation
const Task = ({ task, index }) => {
  const dispatch = useDispatch();

  const handleToggleCompletion = (e) => {
    e.stopPropagation();
    dispatch(toggleTaskCompletion(task.id));
  };

  const handleDeleteTask = (e) => {
    e.stopPropagation();
    dispatch(deleteTask(task.id));
  };

  // Priority colors
  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  const priorityColor = priorityColors[task.priority] || 'bg-gray-100 text-gray-800';

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-3 p-4 rounded-lg border ${
            snapshot.isDragging ? 'shadow-lg bg-white' : 'bg-white shadow-sm'
          } hover:shadow-md transition-shadow`}
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
              <button
                onClick={handleToggleCompletion}
                className={`w-5 h-5 mr-3 rounded-full border flex items-center justify-center ${
                  task.completed 
                    ? 'bg-blue-500 border-blue-500' 
                    : 'border-gray-300'
                }`}
                aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
              >
                {task.completed && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </button>
              <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {task.title}
              </h4>
            </div>
            <button
              onClick={handleDeleteTask}
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Delete task"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          {task.description && (
            <p className="text-gray-600 text-sm mb-3">{task.description}</p>
          )}
          
          <div className="flex flex-wrap gap-2 mt-3">
            {task.dueDate && (
              <div className="flex items-center text-xs text-gray-500">
                <Calendar size={14} className="mr-1" />
                {new Date(task.dueDate).toLocaleDateString()}
              </div>
            )}
            
            {task.priority && (
              <div className={`flex items-center text-xs px-2 py-1 rounded-full ${priorityColor}`}>
                <Tag size={12} className="mr-1" />
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </div>
            )}
            
            {task.estimatedTime && (
              <div className="flex items-center text-xs text-gray-500">
                <Clock size={14} className="mr-1" />
                {task.estimatedTime}
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default memo(Task);