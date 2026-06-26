import React from "react";
import { Link } from 'react-router-dom';
import '../styles/to do tasks.css';

function Tasks() {
  const handleAddTask = (e) => {
    if (e) e.preventDefault();
    console.log("تم الضغط على زر إضافة مهمة!");
  };

  return (
    <>
      {/* 1. Header Section */}
      <header id="main-header" className="site-header sticky-top">
        <div className="container d-flex justify-content-between align-items-center py-3">
          <div id="logo-container" className="d-flex align-items-center gap-2">
            <span className="logo-text font-headline text-uppercase">study hub</span>
            <span className="study-track-badge d-none d-md-inline-block text-uppercase">STUDY TRACK</span>
          </div>

          <nav id="main-nav" className="d-none d-md-flex align-items-center gap-4">
            <Link to="/" className="nav-link">Home</Link>
            <a href="#features-section" className="nav-link">Features</a>
            <a href="#about-section" className="nav-link">About Us</a>
            <a href="#contact-section" className="nav-link">Contact Us</a>
            <Link to="/tasks" className="nav-link active">Study Resources</Link>
          </nav>

          <div id="header-actions" className="d-flex align-items-center gap-3">
            <button id="login-btn" className="btn-login font-headline">Login</button>
            <button id="mobile-menu-btn" className="btn-mobile-menu d-md-none">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="container my-5">
        
        {/* 2. Page Title Section */}
        <div id="page-hero" className="mb-5">
          <span className="sub-title text-uppercase font-headline">personal sanctuary</span>
          <h1 className="main-title font-headline text-capitalize mt-1">Study Hub</h1>
          <p className="description-text mt-2">
            Organize your intellectual pursuits with precision. Your daily academic architecture begins here.
          </p>
        </div>

        {/* 3. Grid Workspace Section */}
        <div className="row g-4">
          
          {/* Aside Column (Left Side on Large Screens) */}
          <aside className="col-12 col-lg-4">
            <div className="d-flex flex-column gap-4">
              
              {/* Today's Focus Card */}
              <div className="focus-card p-4">
                <h3 className="card-heading font-headline mb-4">Today's Focus</h3>
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="percentage-box d-flex align-items-center justify-content-center font-headline">
                    65%
                  </div>
                  <div className="focus-details">
                    <p className="fw-bold m-0 mb-1">Deep Work Session</p>
                    <p className="small text-muted m-0">4 of 6 tasks completed</p>
                  </div>
                </div>
                <div className="timer-badge p-2 d-flex align-items-center gap-2">
                  <span className="material-symbols-outlined small-icon">schedule</span>
                  <span className="small-text font-headline">Focus Timer: 25:00</span>
                </div>
              </div>

              {/* Reading List Card */}
              <div className="reading-card p-4">
                <h3 className="card-heading font-headline mb-3">Reading List</h3>
                <ul className="list-unstyled d-flex flex-column gap-3 m-0">
                  <li className="d-flex align-items-start gap-2">
                    <span className="bullet-square mt-1"></span>
                    <span className="list-text">Foucault - Discipline and Punish (Ch. 2)</span>
                  </li>
                  <li className="d-flex align-items-start gap-2">
                    <span className="bullet-square mt-1"></span>
                    <span className="list-text">The Neural Basis of Decision Making</span>
                  </li>
                </ul>
              </div>

            </div>
          </aside>

          {/* Main Content Column (Right Side on Large Screens) */}
          <main className="col-12 col-lg-8">
            <div className="tasks-container p-4 h-100">
              
              {/* Objectives Header */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="section-title font-headline m-0">Priority Objectives</h2>
                <button className="add-task-btn d-flex align-items-center gap-2" onClick={handleAddTask}>
                  <span className="material-symbols-outlined">add</span>
                  <span className="small-text fw-bold">Add New Task</span>
                </button>
              </div>

              {/* Objectives Tasks List */}
              <div className="d-flex flex-column gap-3">
                
                {/* Task Item 1 (Checked/Active State) */}
                <div className="task-row active-task d-flex align-items-start gap-3 p-3">
                  <div className="custom-checkbox checked mt-1">
                    <span className="material-symbols-outlined check-icon">.</span>
                  </div>
                  <div className="task-body">
                    <h4 className="task-title font-headline m-0 mb-1">Finalize Research Methodology</h4>
                    <p className="task-desc m-0 text-muted">Qualitative analysis section for the Semester Thesis</p>
                  </div>
                </div>

                {/* Task Item 2 */}
                <div className="task-row d-flex align-items-start gap-3 p-3">
                  <div className="custom-checkbox mt-1"></div>
                  <div className="task-body">
                    <h4 className="task-title font-headline m-0 mb-1">Review Bibliographic Citations</h4>
                    <p className="task-desc m-0 text-muted">Ensure all APA 7th Edition formats are consistent</p>
                  </div>
                </div>

                {/* Task Item 3 (Completed Styling) */}
                <div className="task-row completed-task d-flex align-items-start gap-3 p-3">
                  <div className="custom-checkbox checked mt-1">
                    <input type="checkbox" className="material-symbols-outlined check-icon" checked />
                  </div>
                  <div className="task-body">
                    <h4 className="task-title font-headline m-0 mb-1">Attend Seminar: Modern Epistemology</h4>
                    <p className="task-desc m-0 text-muted">Main Auditorium, 10:00 AM</p>
                  </div>
                </div>

                {/* Task Item 4 */}
                <div className="task-row d-flex align-items-start gap-3 p-3">
                  <div className="custom-checkbox mt-1"></div>
                  <div className="task-body">
                    <h4 className="task-title font-headline m-0 mb-1">Draft Abstract for Symposium</h4>
                    <p className="task-desc m-0 text-muted">250-word summary of current laboratory findings</p>
                  </div>
                </div>

                {/* Placeholder Placeholder Row */}
                <div className="task-placeholder d-flex flex-column align-items-center justify-content-center p-4 text-center mt-2">
                  <span className="material-symbols-outlined placeholder-icon mb-2">add</span>
                  <span className="text-muted small">Capture a new intellectual task...</span>
                </div>

              </div>

              {/* Quote Banner Section */}
              <div className="quote-banner mt-4 p-4 d-flex flex-column justify-content-end position-relative overflow-hidden rounded-3">
                <div className="quote-overlay"></div>
                <div className="quote-content position-relative z-1 text-white">
                  <q className="fs-5 fw-normal lh-base mb-2 d-block">
                    The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.
                  </q>
                  <cite className="text-warning small fs-6 style-italic">— Brian Herbert</cite>
                </div>
              </div>

            </div>
          </main>

        </div>
      </div>

      {/* 4. Footer Section */}
      <footer id="main-footer" className="site-footer border-top py-4 mt-5">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-4">
          <div id="footer-branding" className="text-center text-md-start">
            <p className="font-headline fw-bold mb-1 text-uppercase">study hub</p>
            <p className="small text-muted m-0">© 2024 The Academic Atelier. A Digital Sanctuary for Focus.</p>
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

export default Tasks;