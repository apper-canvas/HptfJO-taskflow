import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { CalendarDays, MoreHorizontal, GripVertical } from 'lucide-react';
import { format } from 'date-fns';

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`mb-2 rounded-lg border bg-white p-3 shadow-sm transition-all ${
            snapshot.isDragging 
              ? 'shadow-md ring-2 ring-blue-300' 
              : 'hover:shadow-md'
          }`}
        >
          <div className="flex items-start">
            <div 
              {...provided.dragHandleProps} 
              className="mr-2 flex-shrink-0 p-1 text-gray-400 cursor-grab hover:text-gray-600 -ml-1"
            >
              <GripVertical size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  {task.priority === 'high' && (
                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-red-500" title="High Priority"></span>
                  )}
                  {task.priority === 'medium' && (
                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-yellow-500" title="Medium Priority"></span>
                  )}
                  {task.priority === 'low' && (
                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-500" title="Low Priority"></span>
                  )}
                  <span className="text-xs text-gray-500">#{task.id.slice(-4)}</span>
                </div>
                
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              
              <h3 className="font-medium text-gray-900 line-clamp-2 mb-2">{task.title}</h3>
              
              {task.description && (
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">{task.description}</p>
              )}
              
              <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                <div className="flex items-center">
                  <CalendarDays size={14} className="mr-1" />
                  {task.dueDate ? format(new Date(task.dueDate), 'MMM d') : 'No date'}
                </div>
                
                {task.assignee && (
                  <div className="ml-1 flex items-center">
                    <div className="h-5 w-5 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-medium">
                      {task.assignee.charAt(0).toUpperCase()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;