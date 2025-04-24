import { Home, CheckSquare, Settings, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 flex-shrink-0 min-h-screen">
      <div className="p-4">
        <h1 className="text-2xl font-bold">TaskFlow</h1>
      </div>
      <nav className="mt-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center py-3 px-6 hover:bg-gray-700 ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          <Home className="mr-3" size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `flex items-center py-3 px-6 hover:bg-gray-700 ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          <CheckSquare className="mr-3" size={20} />
          <span>Tasks</span>
        </NavLink>
        <NavLink
          to="/team"
          className={({ isActive }) =>
            `flex items-center py-3 px-6 hover:bg-gray-700 ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          <Users className="mr-3" size={20} />
          <span>Team</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center py-3 px-6 hover:bg-gray-700 ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          <Settings className="mr-3" size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;