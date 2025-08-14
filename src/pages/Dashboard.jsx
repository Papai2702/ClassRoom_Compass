// src/pages/ClassroomDashboard.jsx
import React from "react";
import { motion } from "framer-motion";
import { People, Event, TrendingUp, Lightbulb } from "@mui/icons-material";

export default function ClassroomDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <motion.h1
        className="text-3xl font-bold text-gray-900 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📚 Classroom Compass
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar Cards */}
        {[
          { icon: <People fontSize="large" />, label: "Total Students", value: "128" },
          { icon: <Event fontSize="large" />, label: "Classes This Week", value: "12" },
          { icon: <TrendingUp fontSize="large" />, label: "Avg. Engagement", value: "87%" },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4 hover:shadow-2xl transition"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
          >
            <div className="text-indigo-600">{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-xl font-semibold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts & Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg font-bold mb-4">Attendance Trend</h2>
          <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
            📈 Chart Placeholder
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg font-bold mb-4">Engagement Score</h2>
          <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
            📊 Chart Placeholder
          </div>
        </motion.div>
      </div>

      {/* Tip Section */}
      <motion.div
        className="bg-indigo-50 mt-8 p-6 rounded-xl flex items-center space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Lightbulb className="text-yellow-500" />
        <p className="text-gray-700">
          <strong>Today’s Tip:</strong> Start each class with a quick ice-breaker to boost student participation.
        </p>
      </motion.div>
    </div>
  );
}
