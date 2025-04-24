import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import { Plus } from 'lucide-react';

const Column = ({ column, tasks }) => {
  return (
    <div className="bg-gray-100 rounded-lg w-80 flex-shrink-0 flex flex-col">
      <div className="p-4 font-semibold flex justify-between items-center">
        <h2 className="text-gray-700">{column.title}</h2>
        <span className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs">
          {tasks.length}
        </span>
      </div>
      
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-2 overflow-y-auto min-h-[200px] ${
              snapshot.isDraggingOver ? 'bg-blue-50' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      
      <div className="p-2 border-t">
        <button className="flex items-center justify-center w-full py-2 text-gray-600 hover:bg-gray-200 rounded transition">
          <Plus size={16} className="mr-1" />
          <span>Add Task</span>
        </button>
      </div>
    </div>
  );
};

export default Column;