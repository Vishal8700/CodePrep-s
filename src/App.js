import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home/Home'; // Import the Home component
import DSACourse from './components/DSACourse/DSACourse'; // Import DSACourse
import Course from './components/Course/Course'; // Import Course
import ComingSoon from './components/Commingsoon/Commingsoon'; // Import the ComingSoon component
import './App.css';

function App() {
  return (
    <Routes>
      {/* Home route */}
      <Route path="/" element={<Home />} />
      <Route path="/dsa-courses" element={<DSACourse />} />
      <Route path="/course/:id" element={<Course />} />
      {/* Redirect jobs and events to ComingSoon */}
      <Route path="/jobs" element={<ComingSoon page="Jobs" />} />
      <Route path="/events" element={<ComingSoon page="Events" />} />
      
      {/* Fallback for undefined routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
