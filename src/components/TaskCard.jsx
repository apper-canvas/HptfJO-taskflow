import { Draggable } from 'react-beautiful-dnd';
import { Clock, Flag } from 'lucide-react';
import { format } from 'date-fns';

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High':
      return 'text-red-500';
    case 'Medium':
      return 'text-yellow-500';
    case 'Low':
      return 'text-green-500';
    default:
      return 'text-gray-500';
  }
};

const TaskCard = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white p-3 rounded-md shadow mb-2 ${
            snapshot.isDragging ? 'shadow-lg opacity-90' : ''
          }`}
        >
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-sm">{task.title}</h3>
            <div className={`flex items-center ${getPriorityColor(task.priority)}`}>
              <Flag size={14} className="mr-1" />
              <span className="text-xs">{task.priority}</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-xs mt-2 line-clamp-2">{task.description}</p>
          
          <div className="mt-3 pt-2 border-t flex items-center text-xs text-gray-500">
            <Clock size={14} className="mr-1" />
            <span>
              {task.dueDate 
                ? format(new Date(task.dueDate), 'MMM d, yyyy')
                : 'No due date'}
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;