import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { reorderTasks } from '../store/taskSlice';
import Column from './Column';

const Board = () => {
  const { columns, columnOrder, tasks } = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    // If no destination or dropped in the same place, do nothing
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Reorder the tasks
    dispatch(
      reorderTasks({
        sourceCol: source.droppableId,
        destCol: destination.droppableId,
        sourceIndex: source.index,
        destIndex: destination.index,
        taskId: draggableId
      })
    );
  };

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Task Board</h1>
        <p className="text-gray-600">Drag and drop tasks to manage your workflow</p>
      </div>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4 overflow-x-auto pb-4 h-full">
          {columnOrder.map(columnId => {
            const column = columns[columnId];
            const columnTasks = column.taskIds.map(taskId => tasks[taskId]);
            
            return (
              <Column 
                key={column.id} 
                column={column} 
                tasks={columnTasks}
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;