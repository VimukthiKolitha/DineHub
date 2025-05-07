import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h2 className="footer-logo">SkillShare</h2>
          <p className="footer-description">Cooking Skill-Sharing Platform</p>
          <p className="footer-description">Learn, Share, and Grow Together in the Kitchen</p>
        </div>
        
        {/* Middle Section: Quick Links */}
        <div className="footer-middle">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/my-recipes">Recipes</Link></li>
            <li><Link to="/tutorial">Tutorials</Link></li>
            <li><Link to="/community">Community</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>
        
        {/* Right Section: Social Media Icons */}
        <div className="footer-right">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
      
      {/* Footer Bottom: Copyright */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SkillShare. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
