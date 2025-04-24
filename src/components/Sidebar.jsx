import { Home, CheckSquare, Settings, PieChart, Users, Mail, MessageSquare } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 shadow-sm hidden md:block">
      <div className="p-6">
        <h1 className="text-xl font-bold text-blue-600">TaskFlow</h1>
      </div>
      
      <nav className="mt-2">
        <NavLink 
          to="/" 
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
              isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
            }`
          }
        >
          <Home size={20} className="mr-3" />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/tasks" 
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
              isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
            }`
          }
        >
          <CheckSquare size={20} className="mr-3" />
          <span>My Tasks</span>
        </NavLink>
        
        <NavLink 
          to="/reports" 
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
              isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
            }`
          }
        >
          <PieChart size={20} className="mr-3" />
          <span>Reports</span>
        </NavLink>
        
        <NavLink 
          to="/team" 
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
              isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
            }`
          }
        >
          <Users size={20} className="mr-3" />
          <span>Team</span>
        </NavLink>
        
        <NavLink 
          to="/messages" 
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
              isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
            }`
          }
        >
          <MessageSquare size={20} className="mr-3" />
          <span>Messages</span>
        </NavLink>
        
        <NavLink 
          to="/settings" 
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
              isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
            }`
          }
        >
          <Settings size={20} className="mr-3" />
          <span>Settings</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;