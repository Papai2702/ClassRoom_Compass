import { motion } from 'framer-motion';
import { FiMenu, FiX, FiHome, FiPieChart, FiBarChart2, FiMail, FiCalendar, FiSettings } from 'react-icons/fi';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { icon: <FiHome size={20} />, label: 'Home' },
    { icon: <FiPieChart size={20} />, label: 'Analytics' },
    { icon: <FiBarChart2 size={20} />, label: 'Reports' },
    { icon: <FiMail size={20} />, label: 'Messages' },
    { icon: <FiCalendar size={20} />, label: 'Calendar' },
    { icon: <FiSettings size={20} />, label: 'Settings' },
  ];

  return (
    <motion.div
      initial={{ width: sidebarOpen ? 250 : 80 }}
      animate={{ width: sidebarOpen ? 250 : 80 }}
      transition={{ duration: 0.3 }}
      className={`bg-primary h-full flex flex-col ${sidebarOpen ? 'px-4' : 'px-2'} py-6 text-white`}
    >
      <div className="flex items-center justify-between mb-8">
        {sidebarOpen && <h1 className="text-xl font-bold">Dashboard</h1>}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-full hover:bg-primary-light"
        >
          {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center p-3 rounded-lg hover:bg-primary-light transition-colors ${
                  sidebarOpen ? 'justify-start' : 'justify-center'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

export default Sidebar;
