import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import './HomePage.css';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on mount and on localStorage changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const userData = localStorage.getItem('user');
      setIsLoggedIn(!!userData);
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  return (
    <div className="home-container">
      <Navbar />
      
      <header className="hero">
        <h1>🍳 Cooking Skill-Sharing Platform</h1>
        <p>Learn, Share, and Grow Together in the Kitchen</p>
        {!isLoggedIn && (
          <div className="home-buttons">
            <Link to="/signup" className="btn btn-signup">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-login">
              Login
            </Link>
          </div>
        )}
      </header>
      
      <section className="features">
        {/* Clicking this card navigates to the ShareRecipes page */}
        <Link to="/share-recipes" className="feature-card-link">
          <div className="feature-card">
            <h3>👩‍🍳 Share Recipes</h3>
            <p>Upload your favorite recipes and help others learn your secrets!</p>
          </div>
        </Link>
        
        <div className="feature-card">
          <h3>📚 Learn from Others</h3>
          <p>Access a rich library of user-generated cooking content and tutorials.</p>
        </div>
        
        <Link to="/progress" className="feature-card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="feature-card">
            <h3>🏆 Track Your Progress</h3>
            <p>Mark recipes you've tried, save favorites, and track your growth!</p>
          </div>
        </Link>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;
