import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import { moveTask, fetchTasks } from '../features/tasks/taskSlice';

const TaskBoard = () => {
  const dispatch = useDispatch();
  const { columns, tasks, status } = useSelector(state => state.tasks);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  const onDragEnd = result => {
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

    dispatch(moveTask({
      taskId: draggableId,
      sourceId: source.droppableId,
      sourceIndex: source.index,
      destinationId: destination.droppableId,
      destinationIndex: destination.index
    }));
  };

  // Get tasks for each column
  const getTasksForColumn = columnId => {
    return Object.values(tasks)
      .filter(task => task.status === columnId)
      .sort((a, b) => a.position - b.position);
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-500">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Task Board</h1>
        <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          New Task
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex overflow-x-auto py-2 pb-6 -mx-2 task-board-container">
          {columns.map((column, index) => (
            <Column
              key={column.id}
              column={column}
              tasks={getTasksForColumn(column.id)}
              index={index}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;