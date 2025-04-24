import { Draggable } from 'react-beautiful-dnd';
import { CalendarClock, Clock } from 'lucide-react';
import { format } from 'date-fns';

const Task = ({ task, index }) => {
  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-amber-100 text-amber-800',
    high: 'bg-red-100 text-red-800',
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-3 mb-2 rounded bg-white border shadow-sm 
            ${snapshot.isDragging ? 'shadow-md ring-2 ring-blue-300' : ''}
            transition-all transform hover:-translate-y-1 hover:shadow-md`}
        >
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-800">{task.title}</h3>
            <span className={`text-xs px-2 py-1 rounded ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 mt-1 mb-3 line-clamp-2">{task.description}</p>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <CalendarClock size={14} className="mr-1" />
              <span>{format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
            </div>
            
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{task.estimatedTime} hrs</span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;