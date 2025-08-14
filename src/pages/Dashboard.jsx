import { useState } from 'react';
import { FiUser, FiPieChart, FiBarChart2 } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import StatsCard from '../components/StatsCard';
import ActivityChart from '../components/ActivityChart';
import PerformanceChart from '../components/PerformanceChart';
import RecentActivity from '../components/RecentActivity';
import "../Chartconfig"; // ✅ must be first before using <Line> or <Bar>

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stats = [
    { title: 'Total Users', value: '1,234', change: '+12%', icon: <FiUser size={24} className="text-primary" /> },
    { title: 'Revenue', value: '$34,567', change: '+8%', icon: <FiPieChart size={24} className="text-primary" /> },
    { title: 'Conversion', value: '3.2%', change: '-0.5%', icon: <FiBarChart2 size={24} className="text-primary" /> },
  ];

  const activityData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      { label: 'Activity Trends', data: [12, 19, 3, 5, 2, 3], borderColor: '#3D566E', backgroundColor: 'rgba(61, 86, 110, 0.1)', fill: true, tension: 0.4 }
    ]
  };

  const performanceData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      { label: 'Performance', data: [8, 12, 6, 14], backgroundColor: 'rgba(44, 62, 80, 0.7)' }
    ]
  };

  const recentActivities = [
    { id: 1, title: 'New user registered', time: '2 mins ago' },
    { id: 2, title: 'System update completed', time: '1 hour ago' },
    { id: 3, title: 'Database backup', time: '3 hours ago' },
    { id: 4, title: 'New project created', time: '5 hours ago' },
  ];

  return (
    <div className="flex h-screen bg-[url('https://i.pinimg.com/736x/89/e9/86/89e98604c5e5b241c8cd4b89b29ba218.jpg')] overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-6">
          <StatsCard stats={stats} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ActivityChart data={activityData} />
            <PerformanceChart data={performanceData} />
          </div>
          <RecentActivity activities={recentActivities} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
