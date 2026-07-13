import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Pause,
  RotateCcw,
  Plus,
  GripVertical,
  Calendar,
  Volume2,
  Palette,
  Settings,
  Maximize2,
  Archive,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Features", to: "/#features-section" },
  { label: "About Us", to: "/#about-section" },
  { label: "Contact Us", to: "/#contact-section" },
  { label: "My Profile", to: "/profile" },
];

const SESSION_MINUTES = 25;

const INITIAL_TASKS = [
  {
    id: 1,
    title: "Linear Algebra Quiz Prep",
    meta: { type: "due", label: "Due Today" },
    current: true,
    done: false,
  },
  {
    id: 2,
    title: "Research Methodology Draft",
    meta: { type: "tag", label: "ACADEMIC" },
    current: false,
    done: false,
  },
  {
    id: 3,
    title: "Email Professor regarding Thesis",
    meta: { type: "priority", label: "High Priority" },
    current: false,
    done: false,
  },
];

function formatClock(totalSeconds) {
  const m = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

const styles = {
  page: {
    backgroundColor: "#F3F0E8",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
  },
  nav: {
    width: "100%",
    backgroundColor: "#5B6066",
  },
  navInner: {
    maxWidth: "1600px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 40px",
    flexWrap: "wrap",
    gap: "16px",
  },
  brand: {
    fontSize: "18px",
    fontWeight: 700,
    letterSpacing: "0.02em",
    color: "#D9B94A",
    fontFamily: "Georgia, 'Times New Roman', serif",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "36px",
    flexWrap: "wrap",
  },
  navLink: {
    fontSize: "15px",
    fontWeight: 500,
    color: "rgba(255,255,255,0.85)",
    textDecoration: "none",
    fontFamily: "Georgia, 'Times New Roman', serif",
  },
  navLinkActive: {
    fontSize: "15px",
    fontWeight: 500,
    color: "#D9B94A",
    textDecoration: "none",
    borderBottom: "2px solid #D9B94A",
    paddingBottom: "4px",
    fontFamily: "Georgia, 'Times New Roman', serif",
  },
  loginBtn: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#fff",
    backgroundColor: "#1A2B33",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    cursor: "pointer",
  },
  body: {
    flex: 1,
    display: "flex",
    gap: "0",
    maxWidth: "1600px",
    width: "100%",
    margin: "0 auto",
    padding: "40px",
    boxSizing: "border-box",
    alignItems: "flex-start",
  },
  timerSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "620px",
    position: "relative",
  },
  sessionPill: {
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    color: "#8A8377",
    backgroundColor: "#E7E3D8",
    padding: "8px 20px",
    borderRadius: "999px",
    marginBottom: "24px",
  },
  clock: {
    fontSize: "160px",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: "#16242B",
    lineHeight: 1,
    margin: 0,
    fontVariantNumeric: "tabular-nums",
  },
  controlsRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginTop: "48px",
  },
  playBtn: {
    width: "72px",
    height: "72px",
    borderRadius: "16px",
    backgroundColor: "#16242B",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  resetBtn: {
    width: "72px",
    height: "72px",
    borderRadius: "16px",
    backgroundColor: "#E7E3D8",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  focusingPill: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "40px",
    padding: "12px 24px",
    borderRadius: "999px",
    backgroundColor: "#fff",
    fontSize: "15px",
    color: "#4A453C",
  },
  focusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "999px",
    backgroundColor: "#B08900",
    flexShrink: 0,
  },
  sidebar: {
    width: "420px",
    flexShrink: 0,
    backgroundColor: "#FBF9F4",
    borderRadius: "24px",
    padding: "28px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    minHeight: "880px",
  },
  sidebarHeaderRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
  },
  sidebarTitle: {
    fontSize: "26px",
    fontWeight: 700,
    color: "#16242B",
    margin: 0,
  },
  addBtn: {
    width: "34px",
    height: "34px",
    borderRadius: "999px",
    backgroundColor: "#16242B",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },
  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  taskCard: (current) => ({
    borderRadius: "14px",
    padding: "18px 20px",
    backgroundColor: current ? "#fff" : "#EFECE3",
    borderLeft: current ? "4px solid #16242B" : "4px solid transparent",
    cursor: "pointer",
    boxShadow: current ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
  }),
  taskTopRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "8px",
  },
  currentLabel: {
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    color: "#A8A192",
    marginBottom: "6px",
  },
  taskTitle: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#16242B",
    margin: 0,
  },
  taskTitleDone: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#A8A192",
    margin: 0,
    textDecoration: "line-through",
  },
  dragHandle: {
    color: "#C7C2B5",
    flexShrink: 0,
    cursor: "grab",
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginTop: "10px",
    fontSize: "13px",
    color: "#8A8377",
  },
  tagAcademic: {
    display: "inline-block",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.02em",
    color: "#8A6A1E",
    backgroundColor: "#F3D98B",
    padding: "4px 10px",
    borderRadius: "6px",
    marginTop: "10px",
  },
  priorityLabel: {
    fontSize: "13px",
    color: "#8A8377",
    marginTop: "10px",
  },
  removeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#C7C2B5",
    flexShrink: 0,
  },
  dropZone: {
    marginTop: "6px",
    borderRadius: "14px",
    border: "2px dashed #D9D4C7",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "36px 0",
    color: "#B8B2A2",
  },
  dropZoneLabel: {
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    marginTop: "10px",
  },
  spacer: {
    flex: 1,
  },
  progressSection: {
    marginTop: "20px",
    paddingTop: "20px",
    borderTop: "1px solid #E4DFD1",
  },
  progressRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  progressLabel: {
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.06em",
    color: "#8A8377",
  },
  progressValue: {
    fontSize: "13px",
    fontWeight: 700,
    color: "#16242B",
  },
  progressTrack: {
    width: "100%",
    height: "8px",
    borderRadius: "999px",
    backgroundColor: "#E4DFD1",
    overflow: "hidden",
  },
  progressFill: (pct) => ({
    width: `${pct}%`,
    height: "100%",
    backgroundColor: "#16242B",
    borderRadius: "999px",
    transition: "width 0.3s ease",
  }),
  bottomBar: {
    backgroundColor: "#EFEBE0",
    width: "100%",
  },
  bottomBarInner: {
    maxWidth: "1600px",
    margin: "0 auto",
    padding: "18px 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "16px",
  },
  bottomLeft: {
    display: "flex",
    alignItems: "center",
    gap: "28px",
  },
  bottomControl: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#2A2620",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  bottomCenter: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatarStack: {
    display: "flex",
    alignItems: "center",
  },
  avatarImg: {
    width: "30px",
    height: "30px",
    borderRadius: "999px",
    objectFit: "cover",
    border: "2px solid #EFEBE0",
    marginLeft: "-8px",
  },
  avatarCount: {
    width: "30px",
    height: "30px",
    borderRadius: "999px",
    backgroundColor: "#F3D98B",
    color: "#7A5C1E",
    fontSize: "12px",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #EFEBE0",
    marginLeft: "-8px",
  },
  scholarsText: {
    fontSize: "14px",
    color: "#4A453C",
  },
  bottomRight: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },
  iconBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#4A453C",
    display: "flex",
  },
  addTaskRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "4px",
  },
  addTaskInput: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #D9D4C7",
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  addTaskConfirm: {
    padding: "0 16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#16242B",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  },
};

function NavBar() {
  return (
    <header style={styles.nav}>
      <div style={styles.navInner}>
        <Link to="/" style={styles.brand}>
          StudyHub
        </Link>
        <nav style={styles.navLinks}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              style={item.label === "My Profile" ? styles.navLinkActive : styles.navLink}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link to="/login" style={styles.loginBtn}>
          Login
        </Link>
      </div>
    </header>
  );
}

export default function FocusSessionPage() {
  const [secondsLeft, setSecondsLeft] = useState(SESSION_MINUTES * 60);
  const [running, setRunning] = useState(false);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const dropHover = useRef(false);
  const [isDropHover, setIsDropHover] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (secondsLeft <= 0) {
      setRunning(false);
      return;
    }
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [running, secondsLeft]);

  const currentTask = tasks.find((t) => t.current && !t.done);
  const activeTasks = tasks.filter((t) => !t.done);
  const doneCount = tasks.filter((t) => t.done).length;
  const progressPct = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;

  function selectTask(id) {
    setTasks((prev) => prev.map((t) => ({ ...t, current: t.id === id })));
  }

  function archiveTask(id) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: true, current: false } : t)));
  }

  function handleDrop(e) {
    e.preventDefault();
    const id = Number(e.dataTransfer.getData("text/plain"));
    if (id) archiveTask(id);
    setIsDropHover(false);
  }

  function addTask() {
    if (!newTaskTitle.trim()) return;
    const nextId = Math.max(0, ...tasks.map((t) => t.id)) + 1;
    setTasks((prev) => [
      ...prev,
      { id: nextId, title: newTaskTitle.trim(), meta: { type: "tag", label: "NEW" }, current: false, done: false },
    ]);
    setNewTaskTitle("");
    setShowAddTask(false);
  }

  return (
    <div className="sh-focus" style={styles.page}>
      <style>{`
        .sh-focus, .sh-focus * { box-sizing: border-box; }
        .sh-focus p, .sh-focus h1, .sh-focus h2, .sh-focus h3 { margin: 0; }
        .sh-focus button {
          font-family: inherit;
          appearance: none;
          -webkit-appearance: none;
          padding: 0;
          font-size: inherit;
        }
        .sh-focus input, .sh-focus textarea { font-family: inherit; }
        .sh-focus a { text-decoration: none; }
        .sh-focus img { display: block; max-width: none; }
      `}</style>
      <NavBar />

      <div style={styles.body}>
        <div style={styles.timerSection}>
          <span style={styles.sessionPill}>DEEP WORK SESSION</span>

          <h1 style={styles.clock}>{formatClock(secondsLeft)}</h1>

          <div style={styles.controlsRow}>
            <button
              style={styles.playBtn}
              onClick={() => setRunning((r) => !r)}
              aria-label={running ? "Pause" : "Start"}
            >
              {running ? <Pause size={26} color="#fff" fill="#fff" /> : <Play size={26} color="#fff" fill="#fff" />}
            </button>
            <button
              style={styles.resetBtn}
              onClick={() => {
                setRunning(false);
                setSecondsLeft(SESSION_MINUTES * 60);
              }}
              aria-label="Reset"
            >
              <RotateCcw size={22} color="#16242B" />
            </button>
          </div>

          <div style={styles.focusingPill}>
            <span style={styles.focusDot} />
            Focusing on: {currentTask ? currentTask.title : "No task selected"}
          </div>
        </div>

        <div style={styles.sidebar}>
          <div style={styles.sidebarHeaderRow}>
            <h2 style={styles.sidebarTitle}>Task Queue</h2>
            <button style={styles.addBtn} onClick={() => setShowAddTask((s) => !s)} aria-label="Add task">
              {showAddTask ? <X size={16} color="#fff" /> : <Plus size={16} color="#fff" />}
            </button>
          </div>

          {showAddTask && (
            <div style={styles.addTaskRow}>
              <input
                autoFocus
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                placeholder="New task title"
                style={styles.addTaskInput}
              />
              <button style={styles.addTaskConfirm} onClick={addTask}>
                Add
              </button>
            </div>
          )}

          <div style={styles.taskList}>
            {activeTasks.map((task) => (
              <div
                key={task.id}
                style={styles.taskCard(task.current)}
                onClick={() => selectTask(task.id)}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("text/plain", String(task.id))}
              >
                <div style={styles.taskTopRow}>
                  <div style={{ flex: 1 }}>
                    {task.current && <p style={styles.currentLabel}>CURRENT TASK</p>}
                    <p style={task.done ? styles.taskTitleDone : styles.taskTitle}>{task.title}</p>

                    {task.meta.type === "due" && (
                      <div style={styles.metaRow}>
                        <Calendar size={13} /> {task.meta.label}
                      </div>
                    )}
                    {task.meta.type === "tag" && <span style={styles.tagAcademic}>{task.meta.label}</span>}
                    {task.meta.type === "priority" && <p style={styles.priorityLabel}>{task.meta.label}</p>}
                  </div>
                  <GripVertical size={16} style={styles.dragHandle} />
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              ...styles.dropZone,
              backgroundColor: isDropHover ? "#EFECE3" : "transparent",
              borderColor: isDropHover ? "#16242B" : "#D9D4C7",
              marginTop: "14px",
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDropHover(true);
            }}
            onDragLeave={() => setIsDropHover(false)}
            onDrop={handleDrop}
          >
            <Archive size={20} />
            <span style={styles.dropZoneLabel}>DROP HERE TO ARCHIVE</span>
          </div>

          <div style={styles.spacer} />

          <div style={styles.progressSection}>
            <div style={styles.progressRow}>
              <span style={styles.progressLabel}>SESSION PROGRESS</span>
              <span style={styles.progressValue}>
                {doneCount} / {tasks.length} Tasks
              </span>
            </div>
            <div style={styles.progressTrack}>
              <div style={styles.progressFill(progressPct)} />
            </div>
          </div>
        </div>
      </div>

      <div style={styles.bottomBar}>
        <div style={styles.bottomBarInner}>
          <div style={styles.bottomLeft}>
            <button style={styles.bottomControl}>
              <Volume2 size={16} /> Lo-fi Library Ambient
            </button>
            <button style={styles.bottomControl}>
              <Palette size={16} /> Night Owl Theme
            </button>
          </div>

          <div style={styles.bottomCenter}>
            <div style={styles.avatarStack}>
              <img
                src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&crop=faces"
                alt=""
                style={{ ...styles.avatarImg, marginLeft: 0 }}
              />
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&h=80&fit=crop&crop=faces"
                alt=""
                style={styles.avatarImg}
              />
              <span style={styles.avatarCount}>+14</span>
            </div>
            <span style={styles.scholarsText}>16 scholars studying now</span>
          </div>

          <div style={styles.bottomRight}>
            <button style={styles.iconBtn} aria-label="Settings">
              <Settings size={18} />
            </button>
            <button style={styles.iconBtn} aria-label="Fullscreen">
              <Maximize2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}