import { memo } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

// Column statuses and their colors
const statusColors = {
  'to-do': 'bg-red-100 text-red-800',
  'in-progress': 'bg-yellow-100 text-yellow-800',
  'done': 'bg-green-100 text-green-800'
};

// Column component with proper Droppable implementation
const Column = ({ column, tasks }) => {
  // Get the appropriate color for the column status
  const statusColor = statusColors[column.id] || 'bg-gray-100 text-gray-800';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-800">{column.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${statusColor}`}>
            {tasks.length}
          </span>
        </div>
      </div>
      
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 min-h-[200px] p-4 transition-colors ${
              snapshot.isDraggingOver ? 'bg-blue-50' : 'bg-gray-50'
            }`}
          >
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                No tasks in this column
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default memo(Column);