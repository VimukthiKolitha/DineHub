import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './TutorialPage.css';
import tutorial1 from '../assets/tutorial1.jpg'; 
import tutorial2 from '../assets/tutorial2.jpg'; 
import tutorial3 from '../assets/tutorial3.jpg';

const TutorialPage = () => {
  return (
    <div className="tutorial-page">
      <Navbar />
      <header className="tutorial-hero">
        <h1>Cooking Tutorials</h1>
        <p>Learn new recipes and mastering techniques with our step‐by‐step guides.</p>
      </header>
      <section className="tutorials-section">
        <div className="tutorial-card">
          <img src={tutorial1} alt="Mastering Pasta" />
          <div className="tutorial-info">
            <h3>Mastering Pasta</h3>
            <p>Learn the art of making perfect pasta from scratch with expert tips.</p>
            <a
              href="https://youtu.be/mnnHFnh4y5M?si=cZEi2hZ83Gco9z_m"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tutorial"
            >
              Watch Tutorial
            </a>
          </div>
        </div>
        <div className="tutorial-card">
          <img src={tutorial2} alt="Baking Basics" />
          <div className="tutorial-info">
            <h3>Baking Basics</h3>
            <p>Discover the fundamentals of baking delicious breads and pastries.</p>
            <a href="https://youtu.be/e8tymUqV2-4?si=HJ7YZ_vMCod7-g4C"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tutorial">
              Watch Tutorial
            </a>
          </div>
        </div>
        <div className="tutorial-card">
          <img src={tutorial3} alt="Grilling Techniques" />
          <div className="tutorial-info">
            <h3>Grilling Techniques</h3>
            <p>Explore grilling and techniques to create mouthwatering dishes.</p>
            <a href="https://youtu.be/N28WPCVE1J0?si=a6gGBLXXYp6ND59C"
             target="_blank"
             rel="noopener noreferrer"
              className="btn-tutorial">
              Watch Tutorial
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TutorialPage;
