import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "../styles/to do tasks.css";

function Tasks() {
  // 1. State to store the list of tasks (Initialized with the 4 default tasks from the design)
  const [tasks, setTasks] = useState([
    { id: 1, title: "Finalize Research Methodology", desc: "Qualitative analysis section for the Semester Thesis", completed: true, active: true },
    { id: 2, title: "Review Bibliographic Citations", desc: "Ensure all APA 7th Edition formats are consistent", completed: false, active: false },
    { id: 3, title: "Attend Seminar: Modern Epistemology", desc: "Main Auditorium, 10:00 AM", completed: true, active: false },
    { id: 4, title: "Draft Abstract for Symposium", desc: "250-word summary of current laboratory findings", completed: false, active: false }
  ]);

  // 2. State to control the visibility of the popup screen (Modal)
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 3. States to handle user input inside the form fields
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  // Function to toggle modal visibility and reset input fields
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setNewTitle("");
    setNewDesc("");
  };

  // Function to save the new task and append it to the tasks state array
  const handleSaveTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return; // Prevent adding an empty objective title

    const newTask = {
      id: Date.now(), // Unique identifier using current timestamp
      title: newTitle,
      desc: newDesc,
      completed: false,
      active: false
    };

    setTasks([...tasks, newTask]); // Append the new task to the previous list
    toggleModal(); // Close the popup window
  };

  // Function to toggle task completion status (Checked / Unchecked)
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Dynamic statistics calculations based on the current tasks array
  const totalTasks = tasks.length;
  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <>
      {/* Header Section */}
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
          </div>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="container my-5">
        <div id="page-hero" className="mb-5">
          <span className="sub-title text-uppercase font-headline">personal sanctuary</span>
          <h1 className="main-title font-headline text-capitalize mt-1">Study Hub</h1>
          <p className="description-text mt-2">Organize your intellectual pursuits with precision. Your daily academic architecture begins here.</p>
        </div>

        <div className="row g-4">
          {/* Aside Column (Left Side) */}
          <aside className="col-12 col-lg-4">
            <div className="d-flex flex-column gap-4">
              
              {/* Today's Focus Card (Dynamic progress) */}
              <div className="focus-card p-4">
                <h3 className="card-heading font-headline mb-4">Today's Focus</h3>
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="percentage-box d-flex align-items-center justify-content-center font-headline">
                    {progressPercentage}%
                  </div>
                  <div className="focus-details">
                    <p className="fw-bold m-0 mb-1">Deep Work Session</p>
                    <p className="small text-muted m-0">{completedCount} of {totalTasks} tasks completed</p>
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

          {/* Main Content Column (Right Side) */}
          <main className="col-12 col-lg-8">
            <div className="tasks-container p-4 h-100">
              
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="section-title font-headline m-0">Priority Objectives</h2>
                {/* Triggers modal open on click */}
                <button className="add-task-btn d-flex align-items-center gap-2" onClick={toggleModal}>
                  <span className="material-symbols-outlined">add_circle</span>
                  <span className="small-text fw-bold">Add New Task</span>
                </button>
              </div>

              {/* Dynamically rendering tasks array using JavaScript map */}
              <div className="d-flex flex-column gap-3">
                {tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`task-row d-flex align-items-start gap-3 p-3 ${task.active ? 'active-task' : ''} ${task.completed ? 'completed-task' : ''}`}
                  >
                    {/* Event handler to toggle checkbox state on click */}
                    <div 
                      className={`custom-checkbox mt-1 ${task.completed ? 'checked' : ''}`}
                      onClick={() => toggleTaskCompletion(task.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      {task.completed && <span className="material-symbols-outlined check-icon">check</span>}
                    </div>
                    <div className="task-body flex-grow-1">
                      <h4 className="task-title font-headline m-0 mb-1" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {task.title}
                      </h4>
                      <p className="task-desc m-0 text-muted">{task.desc}</p>
                    </div>
                  </div>
                ))}

                {/* Dotted Placeholder Row (Also acts as an add task trigger) */}
                <div className="task-placeholder d-flex flex-column align-items-center justify-content-center p-4 text-center mt-2" onClick={toggleModal} style={{ cursor: 'pointer' }}>
                  <span className="material-symbols-outlined placeholder-icon mb-2">add</span>
                  <span className="text-muted small">Capture a new intellectual task...</span>
                </div>
              </div>

              {/* Quote Banner */}
              <div className="quote-banner mt-4 p-4 d-flex flex-column justify-content-end position-relative overflow-hidden rounded-3">
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
      
      {/* 5. Custom Popup Screen (Modal Window) */}
      {isModalOpen && (
        <div className="custom-modal-backdrop d-flex align-items-center justify-content-center">
          <div className="custom-modal-content p-4">
            <h3 className="font-headline mb-3 text-dark-blue">Create Intellectual Task</h3>
            <form onSubmit={handleSaveTask}>
              <div className="mb-3">
                <label className="form-label text-uppercase small fw-bold">Objective Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Finalize Chapter 3"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-uppercase small fw-bold">Description / Context</label>
                <textarea 
                  className="form-control" 
                  rows="3"
                  placeholder="Provide scholastic context..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                ></textarea>
              </div>
              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-light" onClick={toggleModal}>Cancel</button>
                <button type="submit" className="btn btn-dark-blue px-4 text-white" style={{ backgroundColor: 'var(--primary)' }}>Save Objective</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer Section */}
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

export default Tasks;