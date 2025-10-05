import { Route, Routes, Navigate, useParams } from 'react-router-dom';
import Home from './components/Home/Home'; // Import the Home component
import DSACourse from './components/DSACourse/DSACourse'; // Import DSACourse
import Course from './components/Course/Course'; // Import Course
import ComingSoon from './components/Commingsoon/Commingsoon'; // Import the ComingSoon component
import EnvStatus from './components/DevTools/EnvStatus'; // Development environment status
import './App.css';

// Import debug utilities (only in development)
if (process.env.NODE_ENV === 'development') {
  import('./utils/envDebug');
  import('./utils/apiTest');
}

// Wrapper component to force re-render when ID changes
const CourseWrapper = () => {
  const { id } = useParams();
  return <Course key={id} />;
};

function App() {
  return (
    <>
      <EnvStatus />
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home />} />
        <Route path="/dsa-courses" element={<DSACourse />} />
        <Route path="/course/:id" element={<CourseWrapper />} />

        {/* Redirect jobs and events to ComingSoon */}
        <Route path="/jobs" element={<ComingSoon page="Jobs" />} />
        <Route path="/events" element={<ComingSoon page="Events" />} />

        {/* Fallback for undefined routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
