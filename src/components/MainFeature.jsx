import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, X, Calendar, Clock, AlertCircle, CheckCircle2, 
  Trash2, Edit3, ChevronDown, ChevronUp
} from 'lucide-react';
import { format } from 'date-fns';

const MainFeature = ({ onTaskAdded, tasks, onStatusChange, onDelete }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'pending'
  });
  const [errors, setErrors] = useState({});
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortDirection, setSortDirection] = useState('asc');
  
  const formRef = useRef(null);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    } else {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.dueDate = "Due date cannot be in the past";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const newTask = {
      id: Date.now().toString(),
      ...formData,
      createdDate: new Date().toISOString()
    };
    
    onTaskAdded(newTask);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      status: 'pending'
    });
    
    setIsFormOpen(false);
  };
  
  const toggleForm = () => {
    setIsFormOpen(prev => !prev);
    setErrors({});
  };
  
  const handleStatusToggle = (taskId, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    onStatusChange(taskId, newStatus);
  };
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      case 'medium':
        return 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30';
      case 'low':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      default:
        return 'text-surface-600 dark:text-surface-400 bg-surface-100 dark:bg-surface-700';
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'pending':
        return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      default:
        return 'text-surface-600 dark:text-surface-400 bg-surface-100 dark:bg-surface-700';
    }
  };
  
  const isTaskOverdue = (task) => {
    if (task.status === 'completed') return false;
    const dueDate = new Date(task.dueDate);
    const now = new Date();
    return dueDate < now;
  };
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.status === 'completed';
    if (filter === 'pending') return task.status === 'pending';
    if (filter === 'overdue') return isTaskOverdue(task);
    return true;
  });
  
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return sortDirection === 'asc' 
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    
    if (sortBy === 'title') {
      return sortDirection === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    
    return 0;
  });
  
  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-surface-800 dark:text-surface-100">
          My Tasks
        </h2>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleForm}
          className="btn-primary"
        >
          {isFormOpen ? (
            <>
              <X size={18} className="mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Plus size={18} className="mr-2" />
              Add New Task
            </>
          )}
        </motion.button>
      </div>
      
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <form 
              ref={formRef}
              onSubmit={handleSubmit} 
              className="card p-6 bg-gradient-to-br from-surface-50 to-white dark:from-surface-800 dark:to-surface-900 border-surface-200 dark:border-surface-700"
            >
              <h3 className="text-xl font-semibold mb-4 text-surface-800 dark:text-surface-100">
                Create New Task
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="label">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`input ${errors.title ? 'border-red-500 dark:border-red-500' : ''}`}
                    placeholder="Enter task title"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="description" className="label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="input min-h-[100px]"
                    placeholder="Enter task description"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="dueDate" className="label">
                      Due Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="dueDate"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleInputChange}
                      className={`input ${errors.dueDate ? 'border-red-500 dark:border-red-500' : ''}`}
                    />
                    {errors.dueDate && (
                      <p className="mt-1 text-sm text-red-500">{errors.dueDate}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="priority" className="label">
                      Priority
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="input"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="status" className="label">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="input"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end pt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="btn-primary"
                  >
                    Create Task
                  </motion.button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="card overflow-visible">
        <div className="p-4 border-b border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 flex flex-col sm:flex-row gap-3 justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === 'pending' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === 'completed' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter('overdue')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === 'overdue' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
              }`}
            >
              Overdue
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-surface-600 dark:text-surface-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm bg-surface-100 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg px-2 py-1.5"
            >
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
            
            <button 
              onClick={toggleSortDirection}
              className="p-1.5 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600"
            >
              {sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>
        
        <div className="divide-y divide-surface-200 dark:divide-surface-700">
          {sortedTasks.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-surface-500 dark:text-surface-400">
                {filter === 'all' 
                  ? "You don't have any tasks yet. Create one to get started!" 
                  : `No ${filter} tasks found.`}
              </p>
            </div>
          ) : (
            sortedTasks.map(task => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className={`p-4 ${
                  task.status === 'completed' ? 'bg-green-50/50 dark:bg-green-900/10' : 
                  isTaskOverdue(task) ? 'bg-red-50/50 dark:bg-red-900/10' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => handleStatusToggle(task.id, task.status)}
                    className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border ${
                      task.status === 'completed'
                        ? 'bg-green-500 border-green-500 dark:bg-green-600 dark:border-green-600'
                        : 'border-surface-300 dark:border-surface-600'
                    } flex items-center justify-center transition-colors`}
                  >
                    {task.status === 'completed' && (
                      <CheckCircle2 size={16} className="text-white" />
                    )}
                  </button>
                  
                  <div className="flex-grow">
                    <div className="flex flex-wrap gap-2 mb-1">
                      <span className={`badge ${getPriorityColor(task.priority)}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                      
                      <span className={`badge ${getStatusColor(task.status)}`}>
                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </span>
                      
                      {isTaskOverdue(task) && (
                        <span className="badge bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                          Overdue
                        </span>
                      )}
                    </div>
                    
                    <h3 className={`text-lg font-medium ${
                      task.status === 'completed' 
                        ? 'line-through text-surface-500 dark:text-surface-400' 
                        : 'text-surface-800 dark:text-surface-100'
                    }`}>
                      {task.title}
                    </h3>
                    
                    {task.description && (
                      <p className="mt-1 text-surface-600 dark:text-surface-400">
                        {task.description}
                      </p>
                    )}
                    
                    <div className="mt-2 flex items-center text-sm text-surface-500 dark:text-surface-400">
                      <Calendar size={14} className="mr-1" />
                      <span>Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 flex gap-2">
                    <button
                      onClick={() => onDelete(task.id)}
                      className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 dark:text-red-400 transition-colors"
                      aria-label="Delete task"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MainFeature;