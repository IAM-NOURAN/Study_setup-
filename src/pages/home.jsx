
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css'; 
import { useAuth } from '../context/AuthContext';
import Header from '../components/header';
import Footer from '../components/footer';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ContactForm from '../components/contactForm';

function Home() {
  const { isLoggedIn } = useAuth();
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
       
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return (
    <>
      
      <Header />

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
                  <Link 
                    to={isLoggedIn ? "/tasks" : "/Signup"} 
                   id="btn-get-started" 
                   className="btn-primary-gradient d-flex align-items-center justify-content-center gap-2 text-decoration-none"
                       >
                      GET STARTED NOW <span className="material-symbols-outlined">arrow_forward</span>
                      </Link>
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
                      <p className="m-0 text-light-blue ">cellor@noa.com</p>
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

             
                <ContactForm/>
              
            </div>
          </div>
        </section>
      </main>

     
      <Footer />
    </>
  );
}

export default Home;