import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { reorderTasks } from '../store/taskSlice';
import Column from './Column';

const TaskBoard = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  
  const [columns, setColumns] = useState({
    'todo': {
      id: 'todo',
      title: 'To Do',
      taskIds: []
    },
    'in-progress': {
      id: 'in-progress',
      title: 'In Progress',
      taskIds: []
    },
    'completed': {
      id: 'completed',
      title: 'Completed',
      taskIds: []
    }
  });

  // Group tasks by status
  useEffect(() => {
    const todoTasks = tasks.filter(task => task.status === 'todo').map(task => task.id);
    const inProgressTasks = tasks.filter(task => task.status === 'in-progress').map(task => task.id);
    const completedTasks = tasks.filter(task => task.status === 'completed').map(task => task.id);

    setColumns({
      'todo': {
        ...columns['todo'],
        taskIds: todoTasks
      },
      'in-progress': {
        ...columns['in-progress'],
        taskIds: inProgressTasks
      },
      'completed': {
        ...columns['completed'],
        taskIds: completedTasks
      }
    });
  }, [tasks]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // Dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find the task being dragged
    const taskId = parseInt(draggableId);
    
    dispatch(reorderTasks({
      taskId,
      sourceColumnId: source.droppableId,
      destinationColumnId: destination.droppableId,
      sourceIndex: source.index,
      destinationIndex: destination.index
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Task Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(columns).map(column => (
            <Column 
              key={column.id} 
              column={column} 
              tasks={column.taskIds.map(taskId => tasks.find(task => task.id === taskId))} 
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;