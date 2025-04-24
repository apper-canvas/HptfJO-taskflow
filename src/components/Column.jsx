import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

const Column = ({ column, tasks }) => {
  const columnColors = {
    'todo': 'bg-blue-50 border-blue-200',
    'in-progress': 'bg-amber-50 border-amber-200',
    'completed': 'bg-green-50 border-green-200',
  };

  const headerColors = {
    'todo': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-amber-100 text-amber-800',
    'completed': 'bg-green-100 text-green-800',
  };

  return (
    <div className={`rounded-lg border ${columnColors[column.id]} overflow-hidden shadow`}>
      <h2 className={`p-3 font-semibold ${headerColors[column.id]}`}>
        {column.title} ({tasks.length})
      </h2>
      
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`p-3 min-h-[200px] transition-colors ${snapshot.isDraggingOver ? 'bg-gray-100' : ''}`}
          >
            {tasks.map((task, index) => task && (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
            {tasks.length === 0 && (
              <div className="text-gray-400 text-center p-4">
                No tasks yet
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;