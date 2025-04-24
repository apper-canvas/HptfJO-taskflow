import { createSlice } from '@reduxjs/toolkit';

// Initial columns for the task board
const initialColumns = {
  'to-do': {
    id: 'to-do',
    title: 'To Do',
    taskIds: []
  },
  'in-progress': {
    id: 'in-progress',
    title: 'In Progress',
    taskIds: []
  },
  'done': {
    id: 'done',
    title: 'Done',
    taskIds: []
  }
};

// Initial state with sample tasks
const initialState = {
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Create project setup',
      description: 'Set up the initial project structure and dependencies',
      priority: 'high',
      status: 'to-do',
      createdAt: '2023-06-01T12:00:00Z',
      completed: false
    },
    'task-2': {
      id: 'task-2',
      title: 'Design UI components',
      description: 'Create reusable UI components for the application',
      priority: 'medium',
      status: 'in-progress',
      dueDate: '2023-06-15',
      estimatedTime: '3 days',
      createdAt: '2023-06-02T12:00:00Z',
      completed: false
    },
    'task-3': {
      id: 'task-3',
      title: 'Research API options',
      description: 'Research and evaluate API options for the backend',
      priority: 'low',
      status: 'done',
      createdAt: '2023-06-03T12:00:00Z',
      completed: true
    }
  },
  columns: {
    ...initialColumns,
    'to-do': {
      ...initialColumns['to-do'],
      taskIds: ['task-1']
    },
    'in-progress': {
      ...initialColumns['in-progress'],
      taskIds: ['task-2']
    },
    'done': {
      ...initialColumns['done'],
      taskIds: ['task-3']
    }
  },
  columnOrder: ['to-do', 'in-progress', 'done']
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = action.payload;
      state.tasks[newTask.id] = newTask;
      
      // Add the task ID to the appropriate column
      state.columns[newTask.status].taskIds.push(newTask.id);
    },
    
    deleteTask: (state, action) => {
      const taskId = action.payload;
      const task = state.tasks[taskId];
      
      if (task) {
        // Remove the task from its column
        const columnId = Object.keys(state.columns).find(
          (colId) => state.columns[colId].taskIds.includes(taskId)
        );
        
        if (columnId) {
          state.columns[columnId].taskIds = state.columns[columnId].taskIds.filter(
            id => id !== taskId
          );
        }
        
        // Delete the task
        delete state.tasks[taskId];
      }
    },
    
    toggleTaskCompletion: (state, action) => {
      const taskId = action.payload;
      if (state.tasks[taskId]) {
        state.tasks[taskId].completed = !state.tasks[taskId].completed;
      }
    },
    
    moveTask: (state, action) => {
      const { taskId, sourceColumnId, sourceIndex, destinationColumnId, destinationIndex } = action.payload;
      
      // Remove from source column
      state.columns[sourceColumnId].taskIds.splice(sourceIndex, 1);
      
      // Add to destination column
      state.columns[destinationColumnId].taskIds.splice(destinationIndex, 0, taskId);
      
      // Update task status if moved to a different column
      if (sourceColumnId !== destinationColumnId) {
        state.tasks[taskId].status = destinationColumnId;
      }
    },
    
    updateTask: (state, action) => {
      const { id, ...updates } = action.payload;
      
      if (state.tasks[id]) {
        state.tasks[id] = {
          ...state.tasks[id],
          ...updates
        };
        
        // If status changed, move task to the appropriate column
        if (updates.status && updates.status !== state.tasks[id].status) {
          // Find current column
          const currentColumnId = Object.keys(state.columns).find(
            (colId) => state.columns[colId].taskIds.includes(id)
          );
          
          if (currentColumnId) {
            // Remove from current column
            state.columns[currentColumnId].taskIds = state.columns[currentColumnId].taskIds.filter(
              taskId => taskId !== id
            );
            
            // Add to new column
            state.columns[updates.status].taskIds.push(id);
          }
        }
      }
    }
  }
});

export const { 
  addTask, 
  deleteTask, 
  toggleTaskCompletion, 
  moveTask, 
  updateTask 
} = tasksSlice.actions;

export default tasksSlice.reducer;