
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css'; 

function Home() {
  return (
    <>
      <header id="main-header" className="site-header sticky-top">
        <div className="container d-flex justify-content-between align-items-center py-3">
          <div id="logo-container" className="d-flex align-items-center gap-2">
            <span className="logo-text font-headline text-uppercase">study hub</span>
            <span className="study-track-badge d-none d-md-inline-block text-uppercase">STUDY TRACK</span>
          </div>

          <nav id="main-nav" className="d-none d-md-flex align-items-center gap-4">
            <Link to="/" className="nav-link active">Home</Link>
            <a href="#features-section" className="nav-link">Features</a>
            <a href="#about-section" className="nav-link">About Us</a>
            <a href="#contact-section" className="nav-link">Contact Us</a>
            <Link to="/tasks" className="nav-link">Study Resources</Link>
          </nav>

          <div id="header-actions" className="d-flex align-items-center gap-3">
            <button id="login-btn" className="btn-login font-headline">Login</button>
            <button id="mobile-menu-btn" className="btn-mobile-menu d-md-none">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/*(Main Content) */}
      <main id="main-content">
        {/* Hero Section */}
        <section id="hero-section" className="hero-section position-relative">
          <div className="hero-bg-image">
            <img src="/src/assets/book.png" alt="Background" />
          </div>
          
          <div className="container position-relative z-1 h-100">
            <div className="row align-items-center h-100 py-5">
              <div className="col-md-7 hero-content">
                <div id="hero-badge" className="hero-badge mb-4">
                  EST. 2024 • THE SCHOLAR'S CHOICE
                </div>
                <h1 id="hero-title" className="hero-title font-headline mb-4">
                  UNLOCK YOUR <br />
                  <span className="text-highlight">ACADEMIC SUCCESS</span>
                </h1>
                <p id="hero-description" className="hero-description mb-5">
                  Transform your study routine into a curated academic ritual. Experience a digital sanctuary designed for deep focus and structural excellence.
                </p>
                <div id="hero-buttons" className="d-flex flex-column flex-sm-row gap-3">
                  <button id="btn-get-started" className="btn-primary-gradient d-flex align-items-center justify-content-center gap-2">
                    GET STARTED NOW <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                  <button id="btn-view-method" className="btn-secondary-outline">
                    VIEW METHODOLOGY
                  </button>
                </div>
              </div>

              <div className="col-md-5 d-none d-md-block position-relative">
                <div id="hero-image-wrapper" className="hero-image-card editorial-shadow">
                  <img src="/src/assets/hero_book.png" alt="Student Notes" className="img-fluid rounded-3" />
                  <div id="efficiency-badge" className="efficiency-badge editorial-shadow">
                    <span className="badge-number font-headline">98%</span>
                    <p className="badge-text text-uppercase m-0">Efficiency Gain</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features-section" className="features-section py-5">
          <div className="container py-5">
            <div className="section-header mb-5">
              <h2 className="section-title font-headline">Precision Tools for Modern Scholars</h2>
              <div className="title-underline"></div>
            </div>

            <div className="row g-4">
              <div className="col-md-8">
                <div id="feature-focus" className="feature-card light-card h-100 d-flex flex-column justify-content-between">
                  <div>
                    <span className="material-symbols-outlined icon-highlight mb-3">timer</span>
                    <h3 className="feature-title font-headline">Deep Focus Architecture</h3>
                    <p className="feature-desc">Our integrated focus timers leverage the Pomodoro technique with atmospheric soundscapes to eliminate digital distractions.</p>
                  </div>
                  <div className="text-end mt-4">
                    <img src="/src/assets/disk.png" alt="Workspace" className="feature-img rounded-3" />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div id="feature-analytics" className="feature-card dark-card h-100 position-relative overflow-hidden">
                  <div className="position-relative z-1">
                    <span className="material-symbols-outlined icon-light mb-3">analytics</span>
                    <h3 className="feature-title text-white font-headline">Cognitive Analytics</h3>
                    <p className="feature-desc text-light-blue">Visual data mapping that reveals your most productive hours and knowledge retention peaks.</p>
                  </div>
                  <span className="material-symbols-outlined watermark-icon">monitoring</span>
                </div>
              </div>

              <div className="col-md-4">
                <div id="feature-vault" className="feature-card gold-card h-100">
                  <span className="material-symbols-outlined icon-dark mb-3">auto_stories</span>
                  <h3 className="feature-title font-headline">Knowledge Vault</h3>
                  <p className="feature-desc">A centralized, high-fidelity library for your research, notes, and citations, indexed with AI precision.</p>
                </div>
              </div>

              <div className="col-md-8">
                <div id="feature-collab" className="feature-card gray-card h-100 d-flex flex-column flex-md-row align-items-center gap-4">
                  <div className="flex-grow-1">
                    <h3 className="feature-title font-headline">Collaborative Ateliers</h3>
                    <p className="feature-desc m-0">Host private study sessions with peers in an environment designed for synchronous flow and shared notes.</p>
                  </div>
                  <div className="avatar-stack d-flex">
                    <img src="/src/assets/avatar1.png" alt="User" className="avatar-img" />
                    <img src="/src/assets/avatar2.png" alt="User" className="avatar-img" />
                    <img src="/src/assets/avatar3.png" alt="User" className="avatar-img" />
                    <div className="avatar-more font-headline text-white d-flex align-items-center justify-content-center">+12</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about-section" className="about-section py-5">
          <div className="container py-5">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <div id="about-content" className="about-content-wrapper">
                  <h2 className="section-title font-headline mb-4">The Hub Philosophy</h2>
                  <div className="about-text mb-4">
                    <p>Founded at the intersection of classical academia and modern cognitive science, <span className="fw-bold text-dark-blue">The Study Hub</span> is more than a tool—it is a digital manifestation of the quiet library alcove.</p>
                    <p>We believe that focus is a sacred resource. Our platform is built to honor the labor of learning by providing a distraction-free environment that prioritizes structural clarity and aesthetic calm.</p>
                    <p>Every pixel in our interface is weighted for intent, ensuring that your cognitive energy is spent on mastering your subject, not navigating our software.</p>
                  </div>
                  <div id="about-stats" className="d-flex gap-5 mt-5">
                    <div className="stat-item">
                      <span className="stat-number font-headline text-dark-blue">500k+</span>
                      <span className="stat-label text-uppercase">Scholars</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number font-headline text-dark-blue">40+</span>
                      <span className="stat-label text-uppercase">Institutions</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <img id="about-image" src="/src/assets/about_img.png" alt="Library" className="img-fluid rounded-4 editorial-shadow library-img" />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact-section" className="contact-section py-5">
          <div className="container py-5">
            <div id="contact-card" className="row mx-0 rounded-4 overflow-hidden contact-wrapper">
              <div className="col-md-4 contact-info-panel p-5 text-white">
                <h2 className="font-headline mb-4 text-white">Inquiries & Admissions</h2>
                <p className="mb-5 text-light-blue">Connect with our curriculum designers for enterprise integration or technical support.</p>
                <div className="contact-details d-flex flex-column gap-4">
                  <div className="d-flex align-items-start gap-3">
                    <span className="material-symbols-outlined icon-gold">mail</span>
                    <div>
                      <h6 className="fw-bold m-0 text-white">Email</h6>
                      <p className="m-0 text-light-blue ">chancellor@academicatelier.com</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-start gap-3">
                    <span className="material-symbols-outlined icon-gold">location_on</span>
                    <div>
                      <h6 className="fw-bold m-0 text-white">Headquarters</h6>
                      <p className="m-0 text-light-blue">The Old Library, Oxford, UK</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-8 contact-form-panel p-5">
                <form id="main-contact-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="row g-4 mb-4">
                    <div className="col-md-6">
                      <label htmlFor="input-name" className="form-label text-uppercase">Your Name</label>
                      <input type="text" id="input-name" className="form-control custom-input" placeholder="Scholastic Full Name" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="input-email" className="form-label text-uppercase">Email Address</label>
                      <input type="email" id="input-email" className="form-control custom-input" placeholder="edu@university.com" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="select-interest" className="form-label text-uppercase">Academic Interest</label>
                    <select id="select-interest" className="form-select custom-input">
                      <option>Institutional Partnership</option>
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Media Relations</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="input-message" className="form-label text-uppercase">Your Message</label>
                    <textarea id="input-message" rows="4" className="form-control custom-input" placeholder="How may we assist your academic journey?"></textarea>
                  </div>
                  <div className="text-end">
                    <button type="submit" id="btn-submit-form" className="btn-primary-gradient d-inline-flex align-items-center gap-2">
                      SEND DISPATCH <span className="material-symbols-outlined"></span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 3.  Footer */}
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

export default Home;