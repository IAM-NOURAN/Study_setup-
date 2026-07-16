import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/home.css';

function Header() {
  const { isLoggedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const getSectionLink = (sectionId) => {
    return isHomePage ? `#${sectionId}` : `/#${sectionId}`;
  };

  return (
    <header id="main-header" className="site-header sticky-top">
      <div className="container d-flex justify-content-between align-items-center py-3">
        <div id="logo-container" className="d-flex align-items-center gap-2">
          <span className="logo-text font-headline text-uppercase">study hub</span>
          <span className="study-track-badge d-none d-md-inline-block text-uppercase">STUDY TRACK</span>
        </div>


        <nav id="main-nav" className="d-none d-md-flex align-items-center gap-4">
          <Link to="/" className="nav-link active">Home</Link>


          <a href={getSectionLink("features-section")} className="nav-link">Features</a>
          <a href={getSectionLink("about-section")} className="nav-link">About Us</a>
          <a href={getSectionLink("contact-section")} className="nav-link">Contact Us</a>

          <Link to="/tasks" className="nav-link">To-Do List</Link>

          <Link to={isLoggedIn ? "/profile" : "/signup"} className="nav-link">
            My Profile
          </Link>
          {/* <Link to= "/profile" className="nav-link">
            My Profile
          </Link> */}
        </nav>

        <div id="header-actions" className="d-flex align-items-center gap-3">

          {!isLoggedIn && (
            <Link
              to="/login"
              id="login-btn"
              className="btn-login font-headline text-decoration-none d-inline-flex align-items-center justify-content-center"
            >
              Login
            </Link>
          )}
          <button id="mobile-menu-btn" className="btn-mobile-menu d-md-none" onClick={toggleMenu}>
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>

      {isMenuOpen && <div className="sidebar-backdrop d-md-none" onClick={toggleMenu}></div>}

      <div className={`mobile-sidebar d-md-none ${isMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header d-flex justify-content-between align-items-center p-3">
          <span className="logo-text font-headline text-uppercase fs-4">study hub</span>
          <button className="btn-close-sidebar" onClick={toggleMenu}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="sidebar-nav d-flex flex-column gap-3 p-4">
          <Link to="/" className="sidebar-link active" onClick={toggleMenu}>Home</Link>


          <a href={getSectionLink("features-section")} className="sidebar-link" onClick={toggleMenu}>Features</a>
          <a href={getSectionLink("about-section")} className="sidebar-link" onClick={toggleMenu}>About Us</a>
          <a href={getSectionLink("contact-section")} className="sidebar-link" onClick={toggleMenu}>Contact Us</a>

          <Link to="/tasks" className="sidebar-link" onClick={toggleMenu}>To-Do List</Link>
          <Link to={isLoggedIn ? "/profile" : "/signup"} className="sidebar-link" onClick={toggleMenu}>My Profile</Link>

          <hr className="sidebar-divider" />
          {!isLoggedIn && (
            <Link
              to="/login"
              className="sidebar-link login-sidebar-link"
              onClick={toggleMenu}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;