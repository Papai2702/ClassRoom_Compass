import React from "react";

import {Route,Routes} from 'react-router-dom'
// import Compass from "./assets/Compass2.png";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import ClassRoom from "./pages/ClassRoom";

const App = () => {
  return (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/classroom" element={<ClassRoom />} />
        </Routes>

  );
};

export default App;
