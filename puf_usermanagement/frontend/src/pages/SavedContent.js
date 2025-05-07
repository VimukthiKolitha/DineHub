import React from 'react';
import './SavedContent.css';
import Navbar from '../components/Navbar';

const SavedContent = () => {
  return (
    <div className="saved-content-container">
      <Navbar />
      <h2>💾 Saved Content</h2>
      <p>Your collection of bookmarked recipes and tutorials.</p>
      <div className="saved-list">
        {/* Map saved content here */}
        <div className="saved-card">🍛 Butter Chicken Tutorial</div>
        <div className="saved-card">🍰 Baking Basics for Beginners</div>
      </div>
    </div>
  );
};

export default SavedContent;
