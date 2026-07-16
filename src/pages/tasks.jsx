import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "../styles/to do tasks.css";
import Header from "../components/header";
import Footer from "../components/footer";
import TaskModal from "../components/TaskModal";
import { useAuth } from '../context/AuthContext';

function Tasks() {
  // 1. Get authentication state
  const { isLoggedIn, user } = useAuth();

  // 2. Get current user ID
  const userId = user?.id || user?.uid || "guest";
  const storageKey = `studyhub_tasks_${userId}`;
 
  console.log("1. Current User ID:", userId);
  console.log("2. Is Logged In?:", isLoggedIn);
  console.log("3. Current Storage Key:", storageKey);
  console.log("4. LocalStorage Has Data?:", localStorage.getItem(storageKey) !== null);
 

  const defaultTasks = [
    { id: 1, title: "Finalize Research Methodology", desc: "Qualitative analysis section for the Semester Thesis", completed: true, active: true },
    { id: 2, title: "Review Bibliographic Citations", desc: "Ensure all APA 7th Edition formats are consistent", completed: false, active: false },
  ];

  // 3. Load tasks directly on initial render 
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(storageKey);
    return savedTasks ? JSON.parse(savedTasks) : defaultTasks;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 4. Save tasks to localStorage ONLY when they actually change
  useEffect(() => {
    if (isLoggedIn && userId !== "guest") {
      localStorage.setItem(storageKey, JSON.stringify(tasks));
    }
  }, [tasks, isLoggedIn, storageKey]);

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Add a new task
  const handleSaveTask = (title, desc) => {
    const newTask = {
      id: Date.now(),
      title: title,
      desc: desc,
      completed: false,
      active: false
    };

    setTasks([...tasks, newTask]);
    toggleModal();
  };

  // Toggle task completion status
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Delete a task
  const handleDeleteTask = (id) => {
    const remainingTasks = tasks.filter(task => task.id !== id);
    setTasks(remainingTasks);
  };

  // Calculate task progress metrics
  const totalTasks = tasks.length;
  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <>
      <Header/>

      <div className="container my-5">
        <div id="page-hero" className="mb-5">
          <span className="sub-title text-uppercase font-headline">personal sanctuary</span>
          <h1 className="main-task-title font-headline text-capitalize mt-1">Study Hub</h1>
          <p className="description-text mt-2">
            Organize your intellectual pursuits with precision. Your daily academic architecture begins here.
            {!isLoggedIn && (
              <span className="d-block text-warning small mt-2 fw-bold">
                ⚠️ You are in Guest Mode. Your changes won't be saved unless you log in.
              </span>
            )}
          </p>
        </div>

        <div className="row g-4">
          <aside className="col-12 col-lg-4">
            <div className="d-flex flex-column gap-4">
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

          <main className="col-12 col-lg-8">
            <div className="tasks-container p-4 h-100">
              
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="section-title font-headline m-0">Priority Objectives</h2>
                <button className="add-task-btn d-flex align-items-center gap-2" onClick={toggleModal}>
                  <span className="material-symbols-outlined">add_circle</span>
                  <span className="small-text fw-bold">Add New Task</span>
                </button>
              </div>

              <div className="d-flex flex-column gap-3">
                {tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`task-row d-flex align-items-center justify-content-between gap-3 p-3 ${task.active ? 'active-task' : ''} ${task.completed ? 'completed-task' : ''}`}
                  >
                    <div className="d-flex align-items-start gap-3 flex-grow-1">
                      <div 
                        className={`custom-checkbox mt-1 ${task.completed ? 'checked' : ''}`}
                        onClick={() => toggleTaskCompletion(task.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        {task.completed && <span className="material-symbols-outlined check-icon">check</span>}
                      </div>
                      
                      <div className="task-body">
                        <h4 className="task-title font-headline m-0 mb-1" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                          {task.title}
                        </h4>
                        <p className="task-desc m-0 text-muted">{task.desc}</p>
                      </div>
                    </div>

                    <button 
                      className="delete-task-btn d-flex align-items-center justify-content-center"
                      onClick={() => handleDeleteTask(task.id)}
                      title="Delete Task"
                    >
                      <span className="material-symbols-outlined delete-icon">delete</span>
                    </button>
                  </div>
                ))}

                <div className="task-placeholder d-flex flex-column align-items-center justify-content-center p-4 text-center mt-2" onClick={toggleModal} style={{ cursor: 'pointer' }}>
                  <span className="material-symbols-outlined placeholder-icon mb-2">add</span>
                  <span className="text-muted small">Capture a new intellectual task...</span>
                </div>
              </div>

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
      
      {isModalOpen && (
        <TaskModal onClose={toggleModal} onSave={handleSaveTask} />
      )}

      <Footer />
    </>
  );
}

export default Tasks;