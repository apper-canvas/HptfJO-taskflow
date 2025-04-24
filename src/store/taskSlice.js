import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [
    {
      id: 1,
      title: 'Research market trends',
      description: 'Analyze current market trends for our industry segment',
      status: 'todo',
      priority: 'high',
      dueDate: '2023-08-15',
      estimatedTime: 4,
      assignedTo: 'John Smith',
    },
    {
      id: 2,
      title: 'Prepare quarterly report',
      description: 'Compile financial data and performance metrics',
      status: 'in-progress',
      priority: 'medium',
      dueDate: '2023-07-30',
      estimatedTime: 6,
      assignedTo: 'Emily Johnson',
    },
    {
      id: 3,
      title: 'Update website content',
      description: 'Refresh product descriptions and add new customer testimonials',
      status: 'completed',
      priority: 'low',
      dueDate: '2023-07-10',
      estimatedTime: 3,
      assignedTo: 'Michael Brown',
    },
    {
      id: 4,
      title: 'Develop marketing strategy',
      description: 'Create a comprehensive marketing plan for Q3',
      status: 'todo',
      priority: 'high',
      dueDate: '2023-08-05',
      estimatedTime: 8,
      assignedTo: 'Sarah Davis',
    },
    {
      id: 5,
      title: 'Client proposal review',
      description: 'Review and finalize proposal for Enterprise client',
      status: 'in-progress',
      priority: 'medium',
      dueDate: '2023-07-25',
      estimatedTime: 2,
      assignedTo: 'David Wilson',
    },
  ],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: state.tasks.length > 0 ? Math.max(...state.tasks.map(task => task.id)) + 1 : 1,
        ...action.payload,
      };
      state.tasks.push(newTask);
    },
    updateTask: (state, action) => {
      const { id, ...updates } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updates };
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    reorderTasks: (state, action) => {
      const { taskId, sourceColumnId, destinationColumnId, sourceIndex, destinationIndex } = action.payload;
      
      // Find the task
      const task = state.tasks.find(t => t.id === taskId);
      
      if (task) {
        // Update the task status if moved to a different column
        if (sourceColumnId !== destinationColumnId) {
          task.status = destinationColumnId;
        }
        
        // We don't need to manually reorder the array for drag and drop visualization
        // as our TaskBoard component will handle this through the column taskIds
        // The status change is the important part for persistence
      }
    }
  },
});

export const { addTask, updateTask, deleteTask, reorderTasks } = taskSlice.actions;
export default taskSlice.reducer;