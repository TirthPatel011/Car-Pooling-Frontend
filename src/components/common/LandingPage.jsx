import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faLeaf, faMapMarkerAlt, faLock } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faLinkedinIn, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import carLogo from '../../../image/navbarlogo.png';
import background from '../../../image/landing image.png';


const LandingPage = () => {
  return (
    <>
      {/* Embedded CSS with New #2ECC9B and Black Theme */}
      <style>{`
        /* Global Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Orbitron', sans-serif;
        }

        body {
          background: linear-gradient(135deg, #000000, #1A3C34); /* Black to dark teal */
          color: #fff;
          overflow-x: hidden;
          line-height: 1.6;
        }

        /* Navbar */
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #000000; /* Black background */
          padding: 10px 20px;
          border-bottom: 2px solid #2ECC9B; /* Teal border */
        }

        .navbar-logo, .footer-section.brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .navbar-logo img, .footer-section.brand img {
          height: 50px;
        }

        .navbar-logo span, .footer-section.brand span {
          font-size: 1.5rem;
          color: #2ECC9B; /* Teal text */
          text-shadow: 0 0 5px #2ECC9B;
        }

        .navbar-links {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .navbar-links a {
          text-decoration: none;
        }

        .auth-btn {
          padding: 10px 25px;
          background: linear-gradient(45deg, #2ECC9B, #000000); /* Teal to black */
          border: none;
          border-radius: 25px;
          color: #fff;
          font-size: 1rem;
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .auth-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 0 20px #2ECC9B; /* Teal glow */
        }

        /* Hero Section */
        .hero {
          position: relative;
          height: 100vh;
          background: url(${background}) no-repeat center center/cover; /* Updated to use the imported image */
          display: flex;
          flex-direction: column;
          justify-content: space-between; /* Space between top and bottom content */
          align-items: center;
          text-align: center;
          padding: 20px; /* Add padding for spacing */
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(46, 204, 155, 0.3)); /* Adjusted for better contrast */
          animation: pulse 4s infinite;
        }

        .content {
          position: relative;
          z-index: 2;
        }

        h1 {
          font-size: 4rem;
          margin-bottom: 1rem;
          text-shadow: 0 0 10px #2ECC9B; /* Teal shadow */
          animation: fadeIn 2s ease-in-out;
        }

        .search-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          justify-content: center;
          background: rgba(0, 0, 0, 0.9); /* Black background */
          padding: 20px;
          border-radius: 10px;
          border: 1px solid #2ECC9B; /* Teal border */
          box-shadow: 0 0 20px rgba(46, 204, 155, 0.3);
          margin-bottom: 10px; /* Add spacing from tagline */
        }

        .holo-input {
          padding: 10px;
          border: none;
          border-bottom: 2px solid #2ECC9B; /* Teal underline */
          background: transparent;
          color: #fff;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.3s;
        }

        .holo-input:focus {
          border-color: #3EEBB1; /* Lighter teal on focus */
        }

        .cta-btn {
          padding: 12px 30px;
          background: linear-gradient(45deg, #2ECC9B, #000000); /* Teal to black */
          border: none;
          border-radius: 25px;
          color: #fff;
          font-size: 1.2rem;
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .cta-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 0 20px #2ECC9B; /* Teal glow */
        }

        .tagline {
          font-size: 1.5rem;
          color: #2ECC9B; /* Teal text */
          margin-bottom: 20px; /* Add spacing from the bottom */
        }

        /* Features Section */
        .features {
          padding: 50px 20px;
          background: #000000; /* Black background */
          text-align: center;
        }

        .features h2 {
          font-size: 2.5rem;
          margin-bottom: 40px;
          color: #2ECC9B; /* Teal text */
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .feature-card {
          background: rgba(46, 204, 155, 0.1); /* Teal-tinted background */
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 0 15px rgba(46, 204, 155, 0.3);
          transition: transform 0.3s;
        }

        .feature-card:hover {
          transform: translateY(-15px);
        }

        .custom-icon {
          font-size: 2rem;
          color: #2ECC9B; /* Teal icon */
          text-shadow: 0 0 5px #2ECC9B;
          margin-bottom: 10px;
        }

        .feature-card h3 {
          font-size: 1.5rem;
          margin-bottom: 10px;
          color: #fff;
        }

        .feature-card p {
          font-size: 1rem;
          color: #ccc;
        }

        /* About Carpool Section */
        .about-carpool {
          padding: 50px 20px;
          background: #1A3C34; /* Dark teal background */
          text-align: center;
        }

        .about-carpool h2 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          color: #2ECC9B; /* Teal text */
        }

        .about-content {
          display: flex;
          flex-direction: row-reverse; /* Reversed layout */
          justify-content: center;
          align-items: center;
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .about-text {
          flex: 1;
          text-align: left;
        }

        .about-text p {
          font-size: 1.1rem;
          color: #ccc;
          margin-bottom: 15px;
        }

        .about-image {
          flex: 1;
        }

        .about-image img {
          width: 100%;
          height: auto;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(46, 204, 155, 0.3);
        }

        /* Car Blogs Section */
        .car-blogs {
          padding: 50px 20px;
          background: #000000; /* Black background */
          text-align: center;
        }

        .car-blogs h2 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          color: #2ECC9B; /* Teal text */
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 25px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .blog-card {
          background: rgba(46, 204, 155, 0.1); /* Teal-tinted background */
          border-radius: 15px;
          overflow: hidden;
          transition: transform 0.3s;
        }

        .blog-card:hover {
          transform: translateY(-15px);
        }

        .blog-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .blog-card h3 {
          font-size: 1.5rem;
          padding: 15px;
          color: #2ECC9B; /* Teal text */
        }

        .blog-card p {
          font-size: 1rem;
          padding: 0 15px 15px;
          color: #ccc;
        }

        .blog-link {
          display: inline-block;
          padding: 10px 20px;
          background: #2ECC9B; /* Teal background */
          color: #000000; /* Black text */
          text-decoration: none;
          border-radius: 5px;
          margin: 10px 15px;
          transition: background 0.3s;
        }

        .blog-link:hover {
          background: #27A583; /* Darker teal */
        }

        /* Footer */
        .footer {
          background: #000000; /* Black background */
          padding: 40px 20px;
          color: #ccc;
          border-top: 2px solid #2ECC9B; /* Teal border */
        }

        .footer-container {
          display: flex;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          flex-wrap: wrap;
          gap: 20px;
        }

        .footer-section {
          flex: 1;
          min-width: 200px;
        }

        .footer-section h3 {
          font-size: 1.2rem;
          color: #2ECC9B; /* Teal text */
          margin-bottom: 10px;
        }

        .footer-logo {
          width: 100px;
          margin-bottom: 10px;
        }

        .footer-section p {
          font-size: 0.9rem;
          margin-bottom: 5px;
        }

        .footer-section ul li {
          margin: 5px 0;
        }

        .footer-section ul li a {
          color: #ccc;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s;
        }

        .footer-section ul li a:hover {
          color: #2ECC9B; /* Teal on hover */
        }

        .volunteer-input {
          padding: 8px;
          border: 1px solid #2ECC9B; /* Teal border */
          border-radius: 5px;
          background: rgba(46, 204, 155, 0.1);
          color: #fff;
          outline: none;
        }

        .volunteer-btn {
          padding: 8px 15px;
          background: #2ECC9B; /* Teal background */
          border: none;
          border-radius: 5px;
          color: #000000; /* Black text */
          cursor: pointer;
          transition: background 0.3s;
        }

        .volunteer-btn:hover {
          background: #27A583; /* Darker teal */
        }

        .footer-bottom {
          text-align: center;
          margin-top: 20px;
          border-top: 1px solid rgba(0, 0, 0, 0.5);
          padding-top: 10px;
        }

        .social-links {
          margin-bottom: 10px;
        }

        .social-icon {
          color: #ccc;
          margin: 0 10px;
          font-size: 1.5rem;
          transition: color 0.3s;
        }

        .social-icon:hover {
          color: #2ECC9B; /* Teal on hover */
        }

        .copyright {
          font-size: 0.8rem;
          color: #666;
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            align-items: flex-start;
          }
          .navbar-logo {
            margin-bottom: 10px;
          }
          .navbar-links {
            flex-direction: column;
            gap: 10px;
            width: 100%;
          }
          .auth-btn {
            width: 100%;
            text-align: center;
          }
          h1 {
            font-size: 2.5rem;
          }
          .search-bar {
            flex-direction: column;
            width: 90%;
          }
          .holo-input, .cta-btn {
            width: 100%;
            margin-bottom: 10px;
          }
          .feature-grid {
            grid-template-columns: 1fr;
          }
          .about-content {
            flex-direction: column;
          }
          .blog-grid {
            grid-template-columns: 1fr;
          }
          .footer-container {
            flex-direction: column;
            text-align: center;
          }
          .volunteer-input {
            width: 70%;
            margin-bottom: 10px;
          }
          .volunteer-btn {
            width: 25%;
          }
        }
      `}</style>
      <div>
        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-logo">
            <img src={carLogo} alt="Car Pool" style={{ width: '63px' }} />
            <span>GreenFuture</span>
          </div>
          <div className="navbar-links">
            <Link to="/login" className="auth-btn">Login</Link>
            <Link to="/signup" className="auth-btn">Sign Up</Link>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="hero">
          <div className="overlay"></div>
          <div className="content">
            <h1>Ride Smart with GreenFuture</h1>
          </div>
          <div>
            <div className="search-bar">
              <input type="text" placeholder="Source" className="holo-input" />
              <input type="text" placeholder="Destination" className="holo-input" />
              <input type="datetime-local" className="holo-input" />
              <button className="cta-btn">Book Your Ride</button>
            </div>
            <p className="tagline">Share a Ride, Cut Costs, and Go Green – Together</p>
          </div>
        </header>

        {/* Features Section */}
        <section className="features">
          <h2>Our Cutting-Edge Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <FontAwesomeIcon icon={faBrain} className="custom-icon" />
              <h3>AI-Optimized Matching</h3>
              <p>Find your perfect ride with AI precision.</p>
            </div>
            <div className="feature-card">
              <FontAwesomeIcon icon={faLeaf} className="custom-icon" />
              <h3>Zero-Emission Rides</h3>
              <p>Reduce your carbon footprint with every trip.</p>
            </div>
            <div className="feature-card">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="custom-icon" />
              <h3>Real-Time Tracking</h3>
              <p>Navigate with live updates.</p>
            </div>
            <div className="feature-card">
              <FontAwesomeIcon icon={faLock} className="custom-icon" />
              <h3>Secure Payments</h3>
              <p>Fast, encrypted transactions.</p>
            </div>
          </div>
        </section>

        {/* About Carpool Section */}
        <section className="about-carpool" id="about">
          <h2>About Carpooling</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Carpooling is a sustainable transportation solution that allows individuals to share rides, reducing traffic congestion, lowering carbon emissions, and saving costs. At GreenFuture, we leverage advanced technology to connect drivers and passengers seamlessly, promoting a greener planet. Join us in revolutionizing urban mobility with every shared journey!
              </p>
              <p>Benefits include reduced fuel consumption, enhanced community connections, and access to real-time ride options tailored to your schedule.</p>
            </div>
            <div className="about-image">
              <img
                src="https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/66c0830dd49aa8001dd85b7f.jpg"
                alt="Carpooling Benefits"
              />
            </div>
          </div>
        </section>

        {/* Car Blogs Section */}
        <section className="car-blogs">
          <h2>Car Blogs</h2>
          <div className="blog-grid">
            <div className="blog-card">
              <img
                src="https://img.freepik.com/free-vector/carpool-concept-illustration_114360-9238.jpg?t=st=1742407403~exp=1742411003~hmac=4e3b217b2f4a2e7f4184542179aa44c525e3b53c9f303c46031ed35c4e0cb1c5&w=1380"
                alt="Futuristic Car Blog"
              />
              <h3>The Rise of Electric Carpools</h3>
              <p>Explore how electric vehicles are transforming carpooling in 2025.</p>
              <a href="#" className="blog-link">Read More</a>
            </div>
            <div className="blog-card">
              <img
                src="https://img.freepik.com/free-vector/carpool-concept-illustration_114360-9258.jpg?t=st=1742407331~exp=1742410931~hmac=90d2090d9d87c10dc0083b1cdc2150897d464f6587ddbd27bd370e7b41474b0b&w=900"
                alt="Sustainable Mobility"
              />
              <h3>Sustainable Mobility Trends</h3>
              <p>Discover the latest trends in eco-friendly transportation.</p>
              <a href="#" className="blog-link">Read More</a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-section brand">
              <img src={carLogo} alt="Car Pool" style={{ width: '63px' }} />
              <span>GreenFuture</span>
            </div>
            <div className="footer-section links">
              <h3>Important Links</h3>
              <ul>
                <li><a href="#">Terms and Conditions</a></li>
                <li><a href="#">Carpool Safety Tips</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Refund Policy</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
            <div className="footer-section contact">
              <h3>Contact Us</h3>
              <p>Phone: +917600516593</p>
              <p>Phone: +917600516593</p>
              <p>pateltirth159@gmail.com</p>
            </div>
            <div className="footer-section volunteer">
              <h3>Become a Volunteer</h3>
              <input type="email" placeholder="Enter your email" className="volunteer-input" />
              <button className="volunteer-btn">Connect</button>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="social-links">
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faLinkedinIn} /></a>
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faYoutube} /></a>
            </div>
            <p className="copyright">© 2025 GreenFuture Carpooling Company. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export { LandingPage };