import { Search, Bell, User, Plus } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          <Plus size={18} className="mr-2" />
          <span>New Task</span>
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <Bell size={20} />
        </button>
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <User size={18} className="text-gray-600" />
        </div>
      </div>
    </header>
  );
};

export default Header;