import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from "react";
import { Clock, RefreshCw, Filter, ChevronRight } from 'lucide-react';

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

  const filteredActivities = filter === 'all'
    ? activities
    : activities.filter(activity => activity.type === filter);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleActivityClick = (id) => {
    setExpandedActivity(expandedActivity === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-black/10 backdrop-blur-xl ring-1 ring-white/10 rounded-2xl shadow-lg p-5 sm:p-6 flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Clock size={18} className="text-white/80" />
          <h3 className="text-base sm:text-lg font-semibold text-white">{title}</h3>
        </div>

        <div className="flex items-center space-x-2">
          {showRefresh && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/80"
              aria-label="Refresh"
            >
              <RefreshCw size={14} className={`${isRefreshing ? 'animate-spin' : ''}`} />
            </motion.button>
          )}

          {showFilter && (
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none pl-2 pr-6 py-1 text-xs rounded-full bg-white/20 border border-white/20 text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 cursor-pointer"
              >
                <option value="all">All</option>
                <option value="system">System</option>
                <option value="user">User</option>
                <option value="alert">Alerts</option>
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white/60">
                <Filter size={10} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Activity list */}
      <ul className="divide-y divide-white/10 flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {filteredActivities.slice(0, maxItems).map(activity => (
            <motion.li
              key={activity.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
              transition={{ duration: 0.25 }}
              className="py-3"
            >
              <div
                onClick={() => handleActivityClick(activity.id)}
                className="flex justify-between items-start cursor-pointer hover:bg-white/5 px-2 py-1 rounded-lg transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <span
                    className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${
                      activity.type === 'system'
                        ? 'bg-blue-400'
                        : activity.type === 'user'
                        ? 'bg-green-400'
                        : activity.type === 'alert'
                        ? 'bg-amber-400'
                        : 'bg-white/60'
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium text-white">{activity.title}</p>
                    <AnimatePresence>
                      {expandedActivity === activity.id && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="text-xs text-white/60 mt-1"
                        >
                          {activity.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs text-white/50">{activity.time}</span>
                  <motion.div
                    animate={{ rotate: expandedActivity === activity.id ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-white/40"
                  >
                    <ChevronRight size={14} />
                  </motion.div>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Footer */}
      {activities.length > maxItems && (
        <div className="pt-3 border-t border-white/10 mt-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-gradient-to-r from-zinc-700 to-zinc-900 text-white text-sm font-medium rounded-full py-2 shadow hover:shadow-lg transition-all"
          >
            View All
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

RecentActivity.defaultProps = {
  activities: [
    { id: 1, title: "New feature deployed", description: "User profile feature deployed.", type: "system", time: "Just now" },
    { id: 2, title: "JaneDoe logged in", description: "Login from San Francisco, CA.", type: "user", time: "2 mins ago" },
    { id: 3, title: "Database overload alert", description: "High load detected. Immediate action required.", type: "alert", time: "10 mins ago" },
    { id: 4, title: "Q3 Performance Report", description: "Quarterly report generated successfully.", type: "system", time: "30 mins ago" },
    { id: 5, title: "JohnSmith updated profile", description: "Updated profile picture and bio.", type: "user", time: "1 hour ago" }
  ]
};

export default RecentActivity;
