import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ListTodo, Calendar, BarChart2, Settings, Kanban } from 'lucide-react';

const Sidebar = () => {
  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/tasks', label: 'Tasks', icon: <ListTodo size={20} /> },
    { path: '/board', label: 'Task Board', icon: <Kanban size={20} /> },
    { path: '/calendar', label: 'Calendar', icon: <Calendar size={20} /> },
    { path: '/reports', label: 'Reports', icon: <BarChart2 size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="bg-white w-64 min-h-full border-r shadow-sm">
      <div className="p-5 border-b">
        <h1 className="text-xl font-bold text-blue-600">TaskFlow</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-100'}`
                }
              >
                <span className="mr-3">{link.icon}</span>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;