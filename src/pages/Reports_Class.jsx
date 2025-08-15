import React from 'react';

// Main App component with consistent styling
const App = () => {
  return (
    <div className="min-h-screen bg-[url('https://i.pinimg.com/736x/8c/4b/29/8c4b29a40b142e7ad2094f18582714a5.jpg')] bg-cover bg-no-repeat text-white p-4 overflow-auto">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar Component - matching previous style */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 p-4 lg:p-6">
          {/* Header Component */}
          <Header />
          
          {/* Dashboard Content */}
          <main className="mt-6">
            {/* Main Dashboard Section */}
            <DashboardSection />
            
            {/* Students Proficiency Section */}
            <StudentsProficiency />
          </main>
        </div>
      </div>
    </div>
  );
};

// Sidebar Component - matching previous design
const Sidebar = () => (
  <aside className="w-full lg:w-64 bg-white/10 backdrop-blur-lg border-b lg:border-r border-white/10 p-4 lg:p-6 flex lg:flex-col items-center lg:items-start space-x-4 lg:space-x-0 lg:space-y-6">
    {/* Logo/Icon placeholder */}
    <div className="hidden lg:block">
      <h1 className="text-xl font-bold">ClassRoomCompass</h1>
      <p className="text-sm text-white/70">Dashboard</p>
    </div>
    <div className="flex items-center lg:flex-col lg:items-start  w-full">
      <NavItem icon="📊" text="Dashboard" active />
      <NavItem icon="📝" text="Prepare" />
      <NavItem icon="🎓" text="Teach" />
      <NavItem icon="📋" text="Assess" />
      <NavItem icon="👀" text="Monitor" />
    </div>
  </aside>
);

const NavItem = ({ icon, text, active = false }) => (
  <a href="#" className={`w-full flex items-center p-3 rounded-xl transition-colors duration-200 ${active ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10'}`}>
    <span className="text-lg">{icon}</span>
    <span className="ml-4 hidden lg:inline">{text}</span>
  </a>
);

// Header Component - matching previous style
const Header = () => (
  <header className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 lg:p-6 flex items-center justify-between border border-white/10 shadow-lg">
    <div className="flex items-center space-x-4">
      <h1 className="text-xl sm:text-2xl font-bold">Class Analytics</h1>
      <span className="flex items-center text-sm text-white/70">
        <span className="hidden sm:inline">Class A</span>
      </span>
    </div>
    <div className="flex items-center space-x-4">
      <div className="flex items-center text-red-400 space-x-1">
        <span>Alerts</span>
        <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
      </div>
      <div className="flex items-center space-x-2">
        <img className="h-10 w-10 rounded-full" src="https://placehold.co/40x40/76d7c4/ffffff?text=U" alt="User avatar"/>
      </div>
    </div>
  </header>
);

// Dashboard Section Component - updated to match previous design
const DashboardSection = () => (
  <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
    {/* Overall Class Score Card */}
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 flex flex-col items-center justify-center border border-white/10 shadow-lg">
      <h2 className="text-white/70 font-semibold mb-2">Overall Class Score</h2>
      <div className="text-5xl font-bold text-white">68%</div>
      <p className="text-white/50 text-sm mt-1">Grade average: 71%</p>
      <div className="mt-4 text-4xl">🏆</div>
    </div>

    {/* Work Assigned Card */}
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 flex flex-col items-center justify-center border border-white/10 shadow-lg">
      <h2 className="text-white/70 font-semibold mb-2">Work Assigned</h2>
      <div className="text-5xl font-bold text-white">36</div>
      <p className="text-white/50 text-sm mt-1">Grade average: 38%</p>
      <div className="mt-4 text-4xl">📚</div>
    </div>

    {/* Quick Stats Cards */}
    <StatCard color="from-green-400 to-green-600" value="5" text="20% of class" subtext="grade avg: 33%" />
    <StatCard color="from-yellow-400 to-yellow-600" value="10" text="40% of class" subtext="grade avg: 50%" />
    <StatCard color="from-red-400 to-red-600" value="5" text="20% of class" subtext="grade avg: 12%" />
  </section>
);

const StatCard = ({ color, value, text, subtext }) => (
  <div className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-white shadow-lg flex items-center border border-white/10`}>
    <div className="flex-1">
      <div className="text-5xl font-bold mb-2">{value}</div>
      <p className="text-sm">{text}</p>
      <p className="text-xs opacity-75">{subtext}</p>
    </div>
    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
      {/* Placeholder for icon/image */}
    </div>
  </div>
);

// Students Proficiency Component - updated style
const StudentsProficiency = () => (
  <section className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mt-6 border border-white/10 shadow-lg">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl md:text-2xl font-bold">Students Proficiency</h2>
      <div className="flex flex-col sm:flex-row sm:space-x-4 text-white/70 text-sm md:text-base">
        <a href="#" className="flex items-center hover:text-white">
          <span className="hidden sm:inline">Learning Objectives</span>
        </a>
        <a href="#" className="font-semibold text-white">All Strands</a>
      </div>
    </div>
    
    {/* Table Header - hidden on small screens */}
    <div className="hidden md:grid grid-cols-6 gap-4 font-semibold text-white/70 text-sm pb-2 border-b border-white/10">
      <div className="col-span-2">Full Name</div>
      <div className="col-span-1">Work Completed</div>
      <div className="col-span-1">Average Score</div>
      <div className="col-span-1">Needing Attention</div>
      <div className="col-span-1">Working Towards</div>
    </div>
    
    {/* Student Rows */}
    <StudentRow name="Sabine Klein" work="33 / 36" score="23%" scoreColor="bg-yellow-400" attention="45" working="8" mastered="7" />
    <StudentRow name="Dante Podenzana" work="31 / 36" score="53%" scoreColor="bg-yellow-500" attention="6" working="35" mastered="19" />
    <StudentRow name="Susan Chan" work="27 / 36" score="82%" scoreColor="bg-green-500" attention="1" working="14" mastered="45" />
  </section>
);

const StudentRow = ({ name, work, score, scoreColor, attention, working, mastered }) => (
  <div className="flex flex-col md:grid md:grid-cols-6 gap-2 md:gap-4 items-center py-4 border-b border-white/10 last:border-b-0">
    <div className="flex items-center space-x-3 w-full md:col-span-2">
      <img className="h-10 w-10 rounded-full" src={`https://placehold.co/40x40/76d7c4/ffffff?text=${name.charAt(0)}`} alt="Avatar"/>
      <span className="font-medium text-white">{name}</span>
    </div>
    <div className="flex justify-between items-center w-full md:col-span-1 md:block">
      <span className="md:hidden font-semibold text-white/70">Work Completed:</span>
      <span className="text-white">{work}</span>
    </div>
    <div className="flex justify-between items-center w-full md:col-span-1 md:block">
      <span className="md:hidden font-semibold text-white/70">Average Score:</span>
      <div className="flex items-center space-x-2">
        <div className={`w-full h-2.5 rounded-full ${scoreColor}`}></div>
        <span className="text-sm font-semibold text-white">{score}</span>
      </div>
    </div>
    <div className="flex justify-between items-center w-full md:col-span-1 md:block">
      <span className="md:hidden font-semibold text-white/70">Needing Attention:</span>
      <CircleStat value={attention} color="bg-orange-500" />
    </div>
    <div className="flex justify-between items-center w-full md:col-span-1 md:block">
      <span className="md:hidden font-semibold text-white/70">Working Towards:</span>
      <CircleStat value={working} color="bg-red-500" />
    </div>
  </div>
);

const CircleStat = ({ value, color }) => (
  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm text-white font-semibold shadow-sm ${color}`}>
    {value}
  </div>
);

export default App;