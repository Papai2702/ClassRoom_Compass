import { FiUser, FiBell, FiSearch, FiPlus } from 'react-icons/fi';
import { useState } from 'react';

const TopNav = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="backdrop-blur-sm  m-b-25 text-white p-4 shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Analytics Dashboard</h1>

        <div className="flex items-center space-x-4">
          {/* Add Class Button with animation */}
          <button
            className="border-2 flex items-center justify-center bg-white text-primary font-medium px-3 py-1 rounded-full 
                       hover:bg-primary-light hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            <FiPlus size={18} className="mr-1" />
            <span className="text-blue-950 font-semibold">Start Class</span>
          </button>

          <button className="p-2 rounded-full hover:bg-primary-light">
            <FiSearch size={20} />
          </button>

          <button className="p-2 rounded-full hover:bg-primary-light relative">
            <FiBell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-2 hover:bg-primary-light rounded-full p-1 pl-3"
            >
              <span>John Doe</span>
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                <FiUser className="text-primary" size={16} />
              </div>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <a href="#" className="block px-4 py-2 text-sm text-blue-950 font-semibold hover:bg-gray-100">
                  Profile
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-blue-950 font-semibold hover:bg-gray-100">
                  Settings
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-blue-950 font-semibold hover:bg-gray-100">
                  Sign out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
