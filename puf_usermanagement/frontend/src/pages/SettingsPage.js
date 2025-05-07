import React from 'react';
import './SettingsPage.css';
import Navbar from '../components/Navbar';

const SettingsPage = () => {
  return (
    <div className="settings-container">
      <Navbar />
      <h2>⚙️ Settings</h2>
      <div className="settings-group">
        <label>🧑 Username:</label>
        <input type="text" placeholder="Your username" />
        <label>📧 Email:</label>
        <input type="email" placeholder="you@example.com" />
        <label>🔒 Change Password:</label>
        <input type="password" placeholder="New password" />
        <button className="save-btn">Save Changes</button>
      </div>
    </div>
  );
};

export default SettingsPage;
