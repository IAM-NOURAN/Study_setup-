import React from "react";
import { Link } from "react-router-dom";
import '../styles/home.css';

function Footer() {
    return (
        <>
        <footer id="main-footer" className="site-footer border-top py-4">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-4">
          <div id="footer-branding" className="text-center text-md-start">
            <p className="font-headline fw-bold mb-1 text-uppercase">study hub</p>
            <p className="small text-muted m-0">© 2024 Study Hub . A Digital Sanctuary for Focus.</p>
          </div>

          <div className="d-flex flex-column flex-md-row align-items-center gap-4">
            <nav id="footer-nav" className="d-flex gap-4">
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Terms of Service</a>
              <a href="#" className="footer-link">Cookie Policy</a>
            </nav>
            <button id="btn-scroll-top" className="btn-scroll-top" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <span className="material-symbols-outlined">up</span>
            </button>
          </div>
        </div>
      </footer>
        </>
    );
}

export default Footer;