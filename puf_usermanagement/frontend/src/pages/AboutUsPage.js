import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './AboutUsPage.css';

const AboutUsPage = () => {
  return (
    <div className="about-container">
      <Navbar />
      <header className="about-hero">
        <div className="hero-overlay">
          <h1>About Us</h1>
          <p>Discover our story and passion for cooking</p>
        </div>
      </header>
      <section className="about-content">
        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            Our platform was born from a desire to bring people together through the love of cooking. Our passionate team of chefs, home cooks, and food enthusiasts created a vibrant community where everyone can share recipes, learn new skills, and celebrate the joy of food.
          </p>
        </div>
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            We aim to inspire home cooks and professional chefs alike to explore innovative cuisines, create memorable dishes, and connect through their love of cooking. Our mission is to provide a friendly, inclusive space where culinary creativity thrives.
          </p>
        </div>
        <div className="about-section">
          <h2>Our Team</h2>
          <div className="team-cards">
            <div className="team-card">
              <img src="https://via.placeholder.com/150" alt="Team Member 1" />
              <h3>Vimukthi</h3>
            </div>
            <div className="team-card">
              <img src="https://via.placeholder.com/150" alt="Team Member 2" />
              <h3>Hashan</h3>
            </div>
            <div className="team-card">
              <img src="https://via.placeholder.com/150" alt="Team Member 3" />
              <h3>Irushi</h3>
            </div>
            <div className="team-card">
              <img src="https://via.placeholder.com/150" alt="Team Member 4" />
              <h3>Upeksha</h3>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
