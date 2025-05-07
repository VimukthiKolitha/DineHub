import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import Login from './components/Login';
import Signup from './components/Signup';
import Community from './components/Community';
import MyRecipes from './pages/MyRecipes';
import SavedContent from './pages/SavedContent';
import UserProgress from './pages/UserProgress';
import SettingsPage from './pages/SettingsPage';
import AboutUsPage from './pages/AboutUsPage';
import TutorialPage from './pages/TutorialPage';
import ShareRecipes from './components/ShareRecipes';
import MyUploads from './pages/MyUploads';
import News from './pages/News'; // Add this import
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
        <Route path="/saved" element={<SavedContent />} />
        <Route path="/progress" element={<UserProgress />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/tutorial" element={<TutorialPage />} />
        <Route path="/share-recipes" element={<ShareRecipes />} />
        <Route path="/community" element={<Community/>} />
        <Route path="/my-uploads" element={<MyUploads />} />
        <Route path="/food-news" element={<News />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
};

export default App;