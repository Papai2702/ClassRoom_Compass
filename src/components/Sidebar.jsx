import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, 
  FiBarChart2, 
  FiMail, 
  FiCalendar, 
  FiSettings, 
  FiChevronRight,
  FiMenu, 
  FiX 
} from 'react-icons/fi';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { icon: <FiHome size={20} />, label: 'Home', active: true },
    { icon: <FiBarChart2 size={20} />, label: 'Reports' },
    { icon: <FiMail size={20} />, label: 'Messages', notification: 3 },
    { icon: <FiCalendar size={20} />, label: 'Calendar' },
    { icon: <FiSettings size={20} />, label: 'Settings' },
  ];

  return (
    <motion.div
      initial={{ width: sidebarOpen ? 250 : 80 }}
      animate={{ 
        width: sidebarOpen ? 250 : 80,
        boxShadow: sidebarOpen ? '12px 0 32px rgba(0,0,0,0.12)' : '6px 0 20px rgba(0,0,0,0.08)'
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`
        bg-gradient-to-b from-primary-dark to-primary
        h-full flex flex-col relative z-30
        py-6 text-white backdrop-blur-sm
        ${sidebarOpen ? 'px-4' : 'px-2'}
        fixed md:relative top-0 left-0
        md:h-full md:overflow-y-auto
        w-full md:w-auto
      `}
    >
      {/* Sidebar header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8 px-1">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.h1 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-xl sm:text-2xl font-bold tracking-wide whitespace-nowrap"
            >
              Dashboard
            </motion.h1>
          )}
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-full transition-colors md:hidden"
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </motion.button>
      </div>

      {/* Navigation menu */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <motion.a
                whileHover={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  translateX: 5
                }}
                whileTap={{ scale: 0.97 }}
                href="#"
                className={`flex items-center p-3 rounded-xl transition-colors duration-200
                  ${item.active ? 'bg-white/10' : 'hover:bg-white/10'}
                  ${sidebarOpen ? 'justify-start' : 'justify-center'}
                  `}
              >
                <div className="relative flex-shrink-0">
                  <span className={`mr-3 ${item.active ? 'text-white' : 'text-white/80'}`}>
                    {item.icon}
                  </span>
                  {item.notification && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-1 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-md"
                    >
                      {item.notification}
                    </motion.span>
                  )}
                </div>
                
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex items-center justify-between flex-1"
                    >
                      <span className={`${item.active ? 'font-semibold' : 'font-medium'}`}>
                        {item.label}
                      </span>
                      {item.active && (
                        <FiChevronRight className="text-white/60" size={16} />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar footer */}
      <div className="mt-auto pt-4 border-t border-white/10 px-1">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-white/50 font-medium"
            >
              v2.4.0 • Updated today
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Sidebar;
