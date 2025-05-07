import React from 'react';
import Navbar from '../components/Navbar';
import './Community.css';
import Footer from './Footer';

const Community = () => {
  return (
    <div className="community-page">
      <Navbar />
      <header className="community-header">
        <h1>Welcome to the Community</h1>
        <p>Connect, share, and inspire each other with culinary passion!</p>
      </header>

      <section className="community-content">
        <div className="community-card">
          <h2>Latest Discussions</h2>
          <p>Join the conversations and share your tips, tricks, and recipes with fellow chefs.</p>
          <button className="btn">Explore Discussions</button>
        </div>
        <div className="community-card">
          <h2>Upcoming Events</h2>
          <p>Discover our live cooking classes and events to boost your skills.</p>
          <button className="btn">View Events</button>
        </div>
        <div className="community-card">
          <h2>Recipe Shares</h2>
          <p>Browse and contribute your favorite recipes to inspire the community.</p>
          <button className="btn">View Recipes</button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Community;
