import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Admin Login Button at the Top */}
      <div className="admin-login">
        <Link to="/admin-login" className="admin-login-btn">Admin Login</Link>
      </div>

      {/* Main Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Tharkuri's Engineering College</h1>
          <p className="hero-description">
            A center of excellence in engineering education, inspiring future leaders.
          </p>
          <div className="login-options">
            <Link to="/register" className="btn">Register</Link>
            <Link to="/login" className="btn">Login</Link>
          </div>
        </div>

        {/* Image Section for "Our Proud Tharkuris" */}
        <div className="our-proud-tharkuris">
          <h2>Our Proud Tharkuri's</h2>
          <div className="tharkuri-images">
            <img src="/aza.jpg" alt="Proud Tharkuri 1" className="tharkuri-img" />
            <img src="/shai.jpg" alt="Proud Tharkuri 2" className="tharkuri-img" />
            <img src="/subha.jpg" alt="Proud Tharkuri 3" className="tharkuri-img" />
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="about-us">
        <h2>About Us</h2>
        <p>
          Tharkuri's Engineering College is dedicated to providing quality education and
          empowering students to become leaders in technology. Our state-of-the-art facilities and expert faculty ensure the best learning environment.
        </p>
      </div>

      {/* Contact Us Section */}
      <div className="contact-us">
        <h2>Contact Us</h2>
        <p>Have any questions? Reach out to us!</p>
        <ul>
          <li>Email: info@tharkuricollege.edu</li>
          <li>Phone: +123 456 7890</li>
          <li>Address: 123 Tharkuri Road, Engineering City</li>
        </ul>
      </div>

      {/* Footer Section */}
      <div className="footer">
        <p>&copy; 2024 Tharkuri's Engineering College. All rights reserved.</p>
      </div>
    </div>
  );
}

export default LandingPage;
