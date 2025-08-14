import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from "react";
import { Clock, RefreshCw, Filter, ChevronRight } from 'lucide-react';

/**
 * A responsive and visually appealing "Recent Activity" widget.
 * It displays a list of activities with filtering, refreshing, and expandable details.
 * The design features a modern "frosted glass" effect with smooth animations.
 *
 * @param {Array<Object>} activities - An array of activity objects to display.
 * @param {string} title - The title of the widget.
 * @param {number} maxItems - The maximum number of activities to show at a time.
 * @param {boolean} showFilter - Whether to display the activity type filter.
 * @param {boolean} showRefresh - Whether to display the refresh button.
 */
const RecentActivity = ({
  activities = [],
  title = "Recent Activity",
  maxItems = 4,
  showFilter = true,
  showRefresh = true
}) => {
  // State for the selected filter (e.g., 'all', 'system', 'user', 'alert')
  const [filter, setFilter] = useState('all');
  // State to control the refresh button animation
  const [isRefreshing, setIsRefreshing] = useState(false);
  // State for the ID of the currently expanded activity item
  const [expandedActivity, setExpandedActivity] = useState(null);

  // Filter activities based on the current filter state
  const filteredActivities = filter === 'all'
    ? activities
    : activities.filter(activity => activity.type === filter);

  // Handler for the refresh button
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulating a data fetch with a timeout
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Handler for clicking an activity item to expand/collapse its description
  const handleActivityClick = (id) => {
    setExpandedActivity(expandedActivity === id ? null : id);
  };

  return (
    // Main container with full-screen background and centered content
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="p-4 sm:p-10 w-full min-h-screen bg-gray-950 flex justify-center items-center font-sans"
    >
      {/* The widget's main card container */}
      <div className="relative w-full max-w-2xl mx-auto rounded-[28px] p-[2px] bg-gradient-to-br from-gray-800 to-gray-700 shadow-2xl">
        {/* Frosted glass body with backdrop blur */}
        <div
          className="relative w-full rounded-[26px] backdrop-blur-3xl bg-black/10 ring-1 ring-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.12)] overflow-hidden p-6 sm:p-8"
        >
          {/* Header section with title and action buttons */}
          <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
            <div className="flex items-center space-x-2">
              {/* Using Lucide-React Clock icon */}
              <Clock size={20} className="text-white/80" />
              <h3 className="font-semibold text-white text-lg sm:text-xl">
                {title}
              </h3>
            </div>

            <div className="flex items-center space-x-3">
              {showRefresh && (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all text-white/80"
                  aria-label="Refresh"
                >
                  {/* Lucide-React Refresh icon with spin animation */}
                  <RefreshCw size={16} className={`${isRefreshing ? 'animate-spin' : ''}`} />
                </motion.button>
              )}

              {showFilter && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  {/* Filter dropdown select, with more compact padding for small screens */}
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-1.5 text-xs sm:text-sm rounded-full bg-black/20 border border-white/20 text-white focus:outline-none focus:ring-1 focus:ring-gray-400 cursor-pointer transition-colors"
                  >
                    <option value="all" className="bg-gray-800 text-white">All</option>
                    <option value="system" className="bg-gray-800 text-blue-400">System</option>
                    <option value="user" className="bg-gray-800 text-green-400">User</option>
                    <option value="alert" className="bg-gray-800 text-amber-400">Alerts</option>
                  </select>
                  {/* Custom dropdown icon */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/60">
                    <Filter size={12} />
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Activities list container */}
          <ul className="divide-y divide-white/10">
            <AnimatePresence mode="wait">
              {filteredActivities.slice(0, maxItems).map(activity => (
                <motion.li
                  key={activity.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="py-4 sm:py-5 group"
                >
                  <motion.div
                    onClick={() => handleActivityClick(activity.id)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer rounded-xl -mx-2 px-2 py-1 transition-colors hover:bg-white/5"
                  >
                    <div className="flex items-start space-x-3 w-full sm:w-auto">
                      <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${
                        activity.type === 'system' ? 'bg-blue-400' :
                        activity.type === 'user' ? 'bg-green-400' :
                        activity.type === 'alert' ? 'bg-amber-400' : 'bg-white/60'
                      }`} />
                      <div className="overflow-hidden">
                        <p className="text-white/90 group-hover:text-white transition-colors text-sm sm:text-base font-medium leading-tight">
                          {activity.title}
                        </p>
                        <AnimatePresence>
                          {expandedActivity === activity.id && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-1 text-white/60 text-xs sm:text-sm font-light overflow-hidden"
                            >
                              {activity.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 min-w-fit mt-2 sm:mt-0 sm:pl-0">
                      <p className="text-white/60 text-xs sm:text-sm font-light">
                        {activity.time}
                      </p>
                      <motion.div
                        animate={{ rotate: expandedActivity === activity.id ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-white/40 group-hover:text-white/60"
                      >
                        <ChevronRight size={16} />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          {/* Footer with item count and "View All" button */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {activities.length > maxItems && (
              <span className="text-white/50 text-xs sm:text-sm">
                Showing {Math.min(maxItems, filteredActivities.length)} of {filteredActivities.length}
              </span>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-gradient-to-r from-zinc-700 to-zinc-900 text-white font-medium rounded-full px-6 py-2.5 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 text-sm"
            >
              <span>View All</span>
              <ChevronRight size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

RecentActivity.defaultProps = {
  activities: [
    {
      id: 1,
      title: "New feature deployed",
      description: "The new user profile feature has been successfully deployed to production.",
      type: "system",
      time: "Just now"
    },
    {
      id: 2,
      title: "User 'JaneDoe' logged in",
      description: "A new login session was started by JaneDoe from San Francisco, CA.",
      type: "user",
      time: "2 mins ago"
    },
    {
      id: 3,
      title: "High priority alert: Database overload",
      description: "The main database cluster is experiencing a significant increase in load. Immediate attention required.",
      type: "alert",
      time: "10 mins ago"
    },
    {
      id: 4,
      title: "Report 'Q3 Performance' generated",
      description: "The quarterly performance report for Q3 has been automatically generated and is ready for download.",
      type: "system",
      time: "30 mins ago"
    },
    {
      id: 5,
      title: "User 'JohnSmith' updated profile",
      description: "JohnSmith has updated their profile picture and bio information.",
      type: "user",
      time: "1 hour ago"
    },
    {
      id: 6,
      title: "Low priority alert: Disk space warning",
      description: "Server 'web-01' is running low on disk space. Consider cleaning up old logs.",
      type: "alert",
      time: "3 hours ago"
    },
    {
      id: 7,
      title: "System backup completed",
      description: "A full system backup was completed successfully at 2:00 AM.",
      type: "system",
      time: "5 hours ago"
    },
    {
      id: 8,
      title: "User 'JaneDoe' invited a team member",
      description: "JaneDoe has invited a new team member, Sarah, to the project 'Apollo'.",
      type: "user",
      time: "1 day ago"
    }
  ]
};

export default RecentActivity;
