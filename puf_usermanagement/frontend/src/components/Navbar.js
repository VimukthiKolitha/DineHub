// Navbar.js
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Function to get user data from localStorage
  const getUserFromStorage = useCallback(() => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        setCurrentUser(JSON.parse(userData));
      } else {
        setCurrentUser(null);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      setCurrentUser(null);
    }
  }, []);

  useEffect(() => {
    // Initial load from localStorage
    getUserFromStorage();

    // Listen to localStorage changes from other windows
    window.addEventListener('storage', getUserFromStorage);

    // Listen to our custom 'userUpdated' event dispatched from ProfilePage on update
    window.addEventListener('userUpdated', getUserFromStorage);

    return () => {
      window.removeEventListener('storage', getUserFromStorage);
      window.removeEventListener('userUpdated', getUserFromStorage);
    };
  }, [getUserFromStorage]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    setDropdownOpen(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="brand">🍳 SkillShare</Link>
      </div>

      <div className="nav-center">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/my-recipes" onClick={() => setDropdownOpen(false)}>Recipes</Link></li>
          <li><Link to="/tutorial">Tutorials</Link></li>
          <li><Link to="/community">Community</Link></li>
          <li><Link to="/about">About Us</Link></li>
        </ul>
      </div>

      <div className="navbar-right">
        <input type="text" className="search-bar" placeholder="Search..." />
        {!currentUser ? (
          <div className="auth-buttons">
            {/* Login/Signup buttons can be added here */}
          </div>
        ) : (
          <div className="profile-section">
            <img
              src={currentUser.profileImage || "/default-profile.png"}
              alt="User"
              className="profile-icon"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="dropdown-menu">
                <span className="dropdown-user">👋 {currentUser.name || 'User'}</span>
                <Link to="/profile" onClick={() => setDropdownOpen(false)}>Profile</Link>
                <Link to="/settings" onClick={() => setDropdownOpen(false)}>Settings</Link>
                <button onClick={handleLogout} className="btn-logout">Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
