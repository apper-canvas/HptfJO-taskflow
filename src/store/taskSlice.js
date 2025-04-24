import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2', 'task-3']
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: ['task-4', 'task-5']
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: ['task-6']
    }
  },
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Create project documentation',
      description: 'Write comprehensive documentation for the new project',
      priority: 'High',
      dueDate: '2023-06-15'
    },
    'task-2': {
      id: 'task-2',
      title: 'Design user interface',
      description: 'Create mockups for the main dashboard',
      priority: 'Medium',
      dueDate: '2023-06-20'
    },
    'task-3': {
      id: 'task-3',
      title: 'Set up testing environment',
      description: 'Configure Jest and React Testing Library',
      priority: 'Low',
      dueDate: '2023-06-25'
    },
    'task-4': {
      id: 'task-4',
      title: 'Implement authentication',
      description: 'Add user login and registration functionality',
      priority: 'High',
      dueDate: '2023-06-18'
    },
    'task-5': {
      id: 'task-5',
      title: 'Create API endpoints',
      description: 'Develop RESTful API for task management',
      priority: 'Medium',
      dueDate: '2023-06-22'
    },
    'task-6': {
      id: 'task-6',
      title: 'Project setup',
      description: 'Initialize project with Vite and install dependencies',
      priority: 'High',
      dueDate: '2023-06-10'
    }
  },
  columnOrder: ['column-1', 'column-2', 'column-3']
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    reorderTasks: (state, action) => {
      const { sourceCol, destCol, sourceIndex, destIndex } = action.payload;
      
      // If reordering in the same column
      if (sourceCol === destCol) {
        const column = state.columns[sourceCol];
        const newTaskIds = Array.from(column.taskIds);
        const [removed] = newTaskIds.splice(sourceIndex, 1);
        newTaskIds.splice(destIndex, 0, removed);
        
        state.columns[sourceCol].taskIds = newTaskIds;
      } else {
        // Moving from one column to another
        const sourceColumn = state.columns[sourceCol];
        const destColumn = state.columns[destCol];
        const sourceTaskIds = Array.from(sourceColumn.taskIds);
        const destTaskIds = Array.from(destColumn.taskIds);
        
        // Remove from source column
        const [removed] = sourceTaskIds.splice(sourceIndex, 1);
        
        // Insert into destination column
        destTaskIds.splice(destIndex, 0, removed);
        
        state.columns[sourceCol].taskIds = sourceTaskIds;
        state.columns[destCol].taskIds = destTaskIds;
      }
    },
    addTask: (state, action) => {
      const { task, columnId } = action.payload;
      // Add the task to the tasks object
      state.tasks[task.id] = task;
      // Add the task id to the specified column
      state.columns[columnId].taskIds.push(task.id);
    },
    updateTask: (state, action) => {
      const updatedTask = action.payload;
      state.tasks[updatedTask.id] = {
        ...state.tasks[updatedTask.id],
        ...updatedTask
      };
    },
    deleteTask: (state, action) => {
      const { taskId, columnId } = action.payload;
      // Remove task from tasks object
      delete state.tasks[taskId];
      // Remove task id from column
      state.columns[columnId].taskIds = state.columns[columnId].taskIds.filter(
        id => id !== taskId
      );
    }
  }
});

export const { reorderTasks, addTask, updateTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;