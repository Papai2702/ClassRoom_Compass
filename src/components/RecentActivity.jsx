import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiArrowRight, FiFilter, FiRefreshCw } from 'react-icons/fi';
import React, { useState } from "react";

const RecentActivity = ({ 
  activities = [], 
  title = "Recent Activity",
  maxItems = 4,
  showFilter = true,
  showRefresh = true
}) => {
  const [filter, setFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [expandedActivity, setExpandedActivity] = useState(null);

  // Filter activities based on selection
  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === filter);

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Handle activity click
  const handleActivityClick = (id) => {
    setExpandedActivity(expandedActivity === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
      className="relative rounded-[28px] p-[1px] bg-gradient-to-br from-primary/80 to-primary-light/60 shadow-xl"
    >
      {/* Frosted glass body with improved backdrop filter */}
      <div className="relative rounded-[26px] p-6 backdrop-blur-md bg-white/5 ring-1 ring-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.12)] overflow-hidden">
        
        {/* Sheen overlay with gradient */}
        <div className="pointer-events-none absolute inset-0 rounded-[26px] opacity-30
                        before:content-[''] before:absolute before:-inset-px before:rounded-[28px]
                        before:bg-gradient-to-br before:from-white/40 before:via-white/10 before:to-transparent
                        [mask-image:radial-gradient(200%_140%_at_0%_0%,black,transparent)]" />

        {/* Header with actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <FiClock className="text-white/80" size={20} />
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          </div>
          
          <div className="flex space-x-2">
            {showRefresh && (
              <button 
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-all"
                aria-label="Refresh"
              >
                <FiRefreshCw 
                  className={`text-white/80 ${isRefreshing ? 'animate-spin' : ''}`} 
                  size={16} 
                />
              </button>
            )}
            
            {showFilter && (
              <div className="relative">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="appearance-none pl-2 pr-6 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-white/20"
                  style={{
                    color: 'white', // Ensures text is white in the dropdown
                  }}
                >
                  <option value="all" style={{ color: '#000' }}>All</option>
                  <option value="system" style={{ color: '#000' }}>System</option>
                  <option value="user" style={{ color: '#000' }}>User</option>
                  <option value="alert" style={{ color: '#000' }}>Alerts</option>
                </select>
                <FiFilter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/60" size={12} />
              </div>
            )}
          </div>
        </div>

        {/* Activities list */}
        <ul className="divide-y divide-white/10">
          <AnimatePresence>
            {filteredActivities.slice(0, maxItems).map(activity => (
              <motion.li
                key={activity.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="py-3 group"
              >
                <div 
                  onClick={() => handleActivityClick(activity.id)}
                  className="flex justify-between items-start cursor-pointer hover:bg-white/5 transition-colors rounded-lg px-2 -mx-2"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${
                      activity.type === 'system' ? 'bg-blue-400' :
                      activity.type === 'user' ? 'bg-green-400' :
                      activity.type === 'alert' ? 'bg-amber-400' : 'bg-white/60'
                    }`} />
                    <div>
                      <p className="text-white/90 group-hover:text-white transition-colors">
                        {activity.title}
                      </p>
                      {expandedActivity === activity.id && (
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-sm text-white/60 mt-1"
                        >
                          {activity.description}
                        </motion.p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                      {activity.time}
                    </p>
                    <FiArrowRight className="text-white/40 group-hover:text-white/60 transition-colors" size={14} />
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {/* View all button */}
        <div className="mt-5 flex justify-between items-center">
          {activities.length > maxItems && (
            <span className="text-xs text-white/50">
              Showing {Math.min(maxItems, filteredActivities.length)} of {filteredActivities.length} activities
            </span>
          )}
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-gradient-to-r from-primary to-primary-light text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-1"
          >
            <span>View All Activity</span>
            <FiArrowRight size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Default props
RecentActivity.defaultProps = {
  activities: [
    {
      id: 1,
      title: 'New user registration',
      time: '2 mins ago',
      type: 'user',
      description: 'John Doe registered with email john@example.com'
    },
    {
      id: 2,
      title: 'System maintenance completed',
      time: '1 hour ago',
      type: 'system',
      description: 'Scheduled maintenance window completed successfully'
    },
    {
      id: 3,
      title: 'Database backup',
      time: '3 hours ago',
      type: 'system',
      description: 'Nightly backup completed (size: 2.4GB)'
    },
    {
      id: 4,
      title: 'Security alert detected',
      time: '5 hours ago',
      type: 'alert',
      description: 'Unusual login attempt from new device blocked'
    }
  ]
};

export default RecentActivity;