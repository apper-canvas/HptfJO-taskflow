import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PlusCircle, MoreHorizontal } from 'lucide-react';

// Initial sample data
const initialColumns = {
  'column-1': {
    id: 'column-1',
    title: 'To Do',
    taskIds: ['task-1', 'task-2', 'task-3'],
  },
  'column-2': {
    id: 'column-2',
    title: 'In Progress',
    taskIds: ['task-4', 'task-5'],
  },
  'column-3': {
    id: 'column-3',
    title: 'Done',
    taskIds: ['task-6'],
  },
};

const initialTasks = {
  'task-1': { id: 'task-1', content: 'Create project wireframes', priority: 'high' },
  'task-2': { id: 'task-2', content: 'Design homepage mockup', priority: 'medium' },
  'task-3': { id: 'task-3', content: 'Set up development environment', priority: 'low' },
  'task-4': { id: 'task-4', content: 'Implement authentication', priority: 'high' },
  'task-5': { id: 'task-5', content: 'Build navigation component', priority: 'medium' },
  'task-6': { id: 'task-6', content: 'Initial project setup', priority: 'medium' },
};

const initialColumnOrder = ['column-1', 'column-2', 'column-3'];

const Task = ({ task, index }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 mb-2 rounded-lg shadow-sm ${
            snapshot.isDragging ? 'bg-blue-50 shadow-md' : 'bg-white'
          }`}
        >
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-gray-900">{task.content}</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={16} />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span 
              className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}
            >
              {task.priority}
            </span>
            <div className="flex -space-x-1">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600">
                JD
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

const Column = ({ column, tasks, index }) => {
  return (
    <div className="w-72 mr-4 flex-shrink-0">
      <div className="bg-gray-100 rounded-lg shadow-sm p-2">
        <div className="p-2 flex justify-between items-center">
          <h2 className="font-semibold text-gray-700">{column.title}</h2>
          <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
            {tasks.length}
          </span>
        </div>
        
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`min-h-[500px] p-2 transition-colors ${
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
        
        <button className="w-full mt-2 p-2 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md transition-colors">
          <PlusCircle size={16} className="mr-2" />
          <span className="text-sm">Add task</span>
        </button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [state, setState] = useState({
    tasks: initialTasks,
    columns: initialColumns,
    columnOrder: initialColumnOrder,
  });

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    
    // If there's no destination or if the item was dropped in its original position
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }
    
    // If moving within the same column
    if (source.droppableId === destination.droppableId) {
      const column = state.columns[source.droppableId];
      const newTaskIds = Array.from(column.taskIds);
      
      // Remove from original position and insert at new position
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      
      // Create updated column
      const newColumn = {
        ...column,
        taskIds: newTaskIds,
      };
      
      // Update state
      setState({
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      });
      
      return;
    }
    
    // Moving from one column to another
    const sourceColumn = state.columns[source.droppableId];
    const destinationColumn = state.columns[destination.droppableId];
    
    // Remove from source column
    const sourceTaskIds = Array.from(sourceColumn.taskIds);
    sourceTaskIds.splice(source.index, 1);
    
    // Add to destination column
    const destinationTaskIds = Array.from(destinationColumn.taskIds);
    destinationTaskIds.splice(destination.index, 0, draggableId);
    
    // Create updated columns
    const newSourceColumn = {
      ...sourceColumn,
      taskIds: sourceTaskIds,
    };
    
    const newDestinationColumn = {
      ...destinationColumn,
      taskIds: destinationTaskIds,
    };
    
    // Update state
    setState({
      ...state,
      columns: {
        ...state.columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestinationColumn.id]: newDestinationColumn,
      },
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Project Tasks</h1>
        <div className="flex mt-4 items-center justify-between">
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              <PlusCircle size={18} className="inline mr-2" />
              Add Task
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              Filter
            </button>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Sort by:</span>
            <select className="border border-gray-300 rounded-md p-2 text-sm">
              <option>Priority</option>
              <option>Due Date</option>
              <option>Assignee</option>
            </select>
          </div>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex overflow-x-auto pb-4">
          {state.columnOrder.map((columnId, index) => {
            const column = state.columns[columnId];
            const columnTasks = column.taskIds.map(taskId => state.tasks[taskId]);
            
            return (
              <Column 
                key={column.id} 
                column={column} 
                tasks={columnTasks} 
                index={index} 
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Dashboard;