import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import ProfilesPage from './pages/ProfilesPage';
import Dashboard from './pages/Dashboard';
import UserProfilePage from './pages/UserProfilePage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-center" />
        <div className="min-h-screen font-sans">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/profiles" element={<ProfilesPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile/:profileID" element={<UserProfilePage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
