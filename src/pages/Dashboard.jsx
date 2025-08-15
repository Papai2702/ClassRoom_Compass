import { useState, useEffect } from 'react';
import { FiUser, FiPieChart, FiBarChart2 } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import StatsCard from '../components/StatsCard';
import ActivityChart from '../components/ActivityChart';
import PerformanceChart from '../components/PerformanceChart';
import RecentActivity from '../components/RecentActivity';
import "../Chartconfig";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  // Detect screen size and orientation changes
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Responsive padding values
  const getMainPadding = () => {
    if (isMobile && isLandscape) return "p-2";
    if (isMobile) return "p-4";
    return "p-6";
  };

  const getChartGap = () => {
    if (isMobile && isLandscape) return "gap-3";
    if (isMobile) return "gap-4";
    return "gap-6";
  };

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
    <div className="DashBoard flex h-screen bg-[url('https://i.pinimg.com/736x/3e/63/b0/3e63b054da44ad2e3965576d07758146.jpg')] bg-no-repeat bg-cover overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isMobile={isMobile} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav isMobile={isMobile} isLandscape={isLandscape} />
        
        <main className={`flex-1 overflow-y-auto ${getMainPadding()}`}>
          <StatsCard stats={stats} isMobile={isMobile} isLandscape={isLandscape} />
          
          <div className={`grid grid-cols-1 lg:grid-cols-2 ${getChartGap()} mb-6`}>
            <ActivityChart 
              data={activityData} 
              isMobile={isMobile} 
              isLandscape={isLandscape} 
            />
            <PerformanceChart 
              data={performanceData} 
              isMobile={isMobile} 
              isLandscape={isLandscape} 
            />
          </div>
          
          <RecentActivity 
            activities={recentActivities} 
            isMobile={isMobile} 
            isLandscape={isLandscape} 
          />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;