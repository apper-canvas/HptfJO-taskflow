import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainFeature from '../components/MainFeature';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const Home = () => {
  const [stats, setStats] = useState({
    completed: 0,
    pending: 0,
    overdue: 0
  });
  
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  useEffect(() => {
    // Calculate stats based on tasks
    const now = new Date();
    
    const completed = tasks.filter(task => task.status === 'completed').length;
    const pending = tasks.filter(task => task.status === 'pending').length;
    const overdue = tasks.filter(task => {
      if (task.status === 'completed') return false;
      const dueDate = new Date(task.dueDate);
      return dueDate < now;
    }).length;
    
    setStats({ completed, pending, overdue });
    
    // Save tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  const handleTaskAdded = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };
  
  const handleTaskStatusChange = (taskId, newStatus) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };
  
  const handleTaskDelete = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8 text-surface-800 dark:text-surface-100">
          My Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            whileHover={{ y: -5 }}
            className="card p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-800/30 text-green-600 dark:text-green-400 mr-4">
                <CheckCircle size={24} />
              </div>
              <div>
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">Completed Tasks</p>
                <h3 className="text-2xl font-bold text-green-700 dark:text-green-300">{stats.completed}</h3>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="card p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-800/30 text-blue-600 dark:text-blue-400 mr-4">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Pending Tasks</p>
                <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.pending}</h3>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="card p-6 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-800/30 text-amber-600 dark:text-amber-400 mr-4">
                <AlertTriangle size={24} />
              </div>
              <div>
                <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">Overdue Tasks</p>
                <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-300">{stats.overdue}</h3>
              </div>
            </div>
          </motion.div>
        </div>
        
        <MainFeature 
          onTaskAdded={handleTaskAdded} 
          tasks={tasks} 
          onStatusChange={handleTaskStatusChange}
          onDelete={handleTaskDelete}
        />
      </motion.div>
    </div>
  );
};

export default Home;