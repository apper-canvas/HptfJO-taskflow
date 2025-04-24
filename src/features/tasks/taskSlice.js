import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock API call
const fetchTasksFromAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        tasks: {
          'task-1': { id: 'task-1', title: 'Create login page', description: 'Implement authentication flow', status: 'todo', position: 0, priority: 'high', dueDate: '2023-07-20', assignee: 'John' },
          'task-2': { id: 'task-2', title: 'Design dashboard', description: 'Create wireframes for the main dashboard', status: 'todo', position: 1, priority: 'medium', dueDate: '2023-07-25', assignee: 'Emma' },
          'task-3': { id: 'task-3', title: 'API integration', description: 'Connect to backend services', status: 'inProgress', position: 0, priority: 'high', dueDate: '2023-07-15', assignee: 'Mike' },
          'task-4': { id: 'task-4', title: 'Unit testing', description: 'Write tests for critical components', status: 'inProgress', position: 1, priority: 'medium', dueDate: '2023-07-30', assignee: 'Sarah' },
          'task-5': { id: 'task-5', title: 'Documentation', description: 'Update project documentation', status: 'done', position: 0, priority: 'low', dueDate: '2023-07-10', assignee: 'John' },
        },
        columns: [
          { id: 'todo', title: 'To Do', taskIds: ['task-1', 'task-2'] },
          { id: 'inProgress', title: 'In Progress', taskIds: ['task-3', 'task-4'] },
          { id: 'done', title: 'Done', taskIds: ['task-5'] },
        ]
      });
    }, 1000);
  });
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const response = await fetchTasksFromAPI();
    return response;
  }
);

const initialState = {
  tasks: {},
  columns: [],
  status: 'idle',
  error: null
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    moveTask: (state, action) => {
      const { taskId, sourceId, destinationId, sourceIndex, destinationIndex } = action.payload;
      const task = state.tasks[taskId];

      // Update task status if moved to a different column
      if (sourceId !== destinationId) {
        task.status = destinationId;
      }

      // Get all tasks in source column
      const sourceTasks = Object.values(state.tasks)
        .filter(task => task.status === sourceId)
        .sort((a, b) => a.position - b.position);

      // Remove task from source position
      sourceTasks.splice(sourceIndex, 1);

      // Update positions of remaining tasks in source column
      sourceTasks.forEach((task, index) => {
        state.tasks[task.id].position = index;
      });

      // If moving to a different column
      if (sourceId !== destinationId) {
        // Get all tasks in destination column
        const destinationTasks = Object.values(state.tasks)
          .filter(task => task.status === destinationId)
          .sort((a, b) => a.position - b.position);

        // Insert task at destination position
        destinationTasks.splice(destinationIndex, 0, task);

        // Update positions of all tasks in destination column
        destinationTasks.forEach((task, index) => {
          state.tasks[task.id].position = index;
        });
      } else {
        // If moving within the same column, insert task at destination
        sourceTasks.splice(destinationIndex, 0, task);
        
        // Update positions
        sourceTasks.forEach((task, index) => {
          state.tasks[task.id].position = index;
        });
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload.tasks;
        state.columns = action.payload.columns;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { moveTask } = taskSlice.actions;
export default taskSlice.reducer;