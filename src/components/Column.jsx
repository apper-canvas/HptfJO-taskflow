import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

// Using default parameters instead of defaultProps
const Column = ({ 
  column, 
  tasks = [], 
  index,
  isDropDisabled = false 
}) => {
  return (
    <div className="flex flex-col h-full w-72 min-w-72 bg-gray-50 rounded-lg shadow-md mx-2">
      <h2 className="text-lg font-semibold p-4 bg-gray-100 rounded-t-lg border-b border-gray-200">
        {column.title} ({tasks.length})
      </h2>
      
      <Droppable
        droppableId={column.id}
        isDropDisabled={isDropDisabled}
        type="task"
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-2 overflow-y-auto transition-colors min-h-[200px] ${
              snapshot.isDraggingOver ? 'bg-blue-50' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      
      <div className="p-3 bg-gray-100 rounded-b-lg border-t border-gray-200">
        <button className="w-full py-2 px-3 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded border border-gray-300 flex items-center justify-center transition-colors">
          <span className="mr-1">+</span> Add Task
        </button>
      </div>
    </div>
  );
};

export default Column;