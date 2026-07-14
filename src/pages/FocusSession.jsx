import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Pause,
  RotateCcw,
  Plus,
  GripVertical,
  Calendar,
  Palette,
  Settings,
  Maximize2,
  Archive,
  X,
} from "lucide-react";
import "../styles/FocusSession.css";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "My Profile", to: "/profile" },
];

const SESSION_MINUTES = 25;
const BREAK_MINUTES_DEFAULT = 5;

// Shared with ProfilePage — this is what keeps this timer and the
// "Current Focus Session" card on the profile page in sync.
const FOCUS_SESSION_KEY = "studyhub_focus_session_v1";

const THEME_OPTIONS = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
];

function loadSharedSession() {
  try {
    const raw = localStorage.getItem(FOCUS_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function saveSharedSession(data) {
  try {
    localStorage.setItem(FOCUS_SESSION_KEY, JSON.stringify({ ...data, savedAt: Date.now() }));
  } catch (e) {
    // ignore storage errors
  }
}

// Account for real time that passed while the user was away from this page.
function resolveSharedSession() {
  const saved = loadSharedSession();
  if (!saved) return null;
  if (saved.running) {
    const passed = Math.floor((Date.now() - (saved.savedAt || Date.now())) / 1000);
    const remaining = Math.max(0, (saved.secondsLeft || 0) - passed);
    return { ...saved, secondsLeft: remaining, running: remaining > 0 };
  }
  return saved;
}

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

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    }
  } else if (document.exitFullscreen) {
    document.exitFullscreen().catch(() => {});
  }
}

function NavBar() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">
          StudyHub
        </Link>
        <nav className="nav-links">
          {NAV_ITEMS.map((item) => (
            <Link key={item.label} to={item.to} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default function FocusSessionPage() {
  const initialSession = resolveSharedSession();

  const [focusMinutes, setFocusMinutes] = useState(initialSession?.focusMinutes || SESSION_MINUTES);
  const [breakMinutes, setBreakMinutes] = useState(initialSession?.breakMinutes || BREAK_MINUTES_DEFAULT);
  const [phase, setPhase] = useState(initialSession?.phase || "focus");
  const [secondsLeft, setSecondsLeft] = useState(
    initialSession ? initialSession.secondsLeft : SESSION_MINUTES * 60
  );
  const [running, setRunning] = useState(initialSession ? initialSession.running : false);

  const [showSettings, setShowSettings] = useState(false);
  const [draftFocusMinutes, setDraftFocusMinutes] = useState(focusMinutes);
  const [draftBreakMinutes, setDraftBreakMinutes] = useState(breakMinutes);

  const [tasks, setTasks] = useState(initialSession?.tasks || INITIAL_TASKS);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isDropHover, setIsDropHover] = useState(false);

  const [theme, setTheme] = useState(initialSession?.theme || "light");
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (secondsLeft <= 0) {
      if (phase === "focus") {
        setPhase("break");
        setSecondsLeft(breakMinutes * 60);
      } else {
        setPhase("focus");
        setSecondsLeft(focusMinutes * 60);
        setRunning(false);
      }
      return;
    }
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [running, secondsLeft, phase, breakMinutes, focusMinutes]);

  useEffect(() => {
    saveSharedSession({ focusMinutes, breakMinutes, phase, secondsLeft, running, tasks, theme });
  }, [focusMinutes, breakMinutes, phase, secondsLeft, running, tasks, theme]);

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

  function openSettings() {
    setDraftFocusMinutes(focusMinutes);
    setDraftBreakMinutes(breakMinutes);
    setShowSettings((s) => !s);
  }

  function applySettings() {
    const fm = Math.max(1, Number(draftFocusMinutes) || 1);
    const bm = Math.max(1, Number(draftBreakMinutes) || 1);
    setFocusMinutes(fm);
    setBreakMinutes(bm);
    setPhase("focus");
    setSecondsLeft(fm * 60);
    setRunning(false);
    setShowSettings(false);
  }

  return (
    <div className={theme === "dark" ? "sh-focus page dark" : "sh-focus page"}>
      <NavBar />

      <div className="body">
        <div className="timer-section">
          <span className="session-pill">{phase === "break" ? "BREAK TIME" : "DEEP WORK SESSION"}</span>

          <h1 className="clock">{formatClock(secondsLeft)}</h1>

          <div className="controls-row">
            <button
              className="play-btn"
              onClick={() => setRunning((r) => !r)}
              aria-label={running ? "Pause" : "Start"}
            >
              {running ? <Pause size={26} color="#fff" fill="#fff" /> : <Play size={26} color="#fff" fill="#fff" />}
            </button>
            <button
              className="reset-btn"
              onClick={() => {
                setRunning(false);
                setPhase("focus");
                setSecondsLeft(focusMinutes * 60);
              }}
              aria-label="Reset"
            >
              <RotateCcw size={22} color="#16242B" />
            </button>
          </div>

          <button className="timer-settings-btn" onClick={openSettings}>
            <Settings size={14} /> Set Timer &amp; Break
          </button>

          {showSettings && (
            <div className="timer-settings-panel">
              <div className="timer-settings-field">
                <label>Focus (minutes)</label>
                <input
                  type="number"
                  min="1"
                  value={draftFocusMinutes}
                  onChange={(e) => setDraftFocusMinutes(e.target.value)}
                />
              </div>
              <div className="timer-settings-field">
                <label>Break (minutes)</label>
                <input
                  type="number"
                  min="1"
                  value={draftBreakMinutes}
                  onChange={(e) => setDraftBreakMinutes(e.target.value)}
                />
              </div>
              <button className="timer-settings-apply" onClick={applySettings}>
                Apply
              </button>
            </div>
          )}

          <div className="focusing-pill">
            <span className="focus-dot" />
            Focusing on: {currentTask ? currentTask.title : "No task selected"}
          </div>

          <div className="break-info-pill">
            {phase === "break"
              ? `On break — ${formatClock(secondsLeft)} left`
              : `Break after this session: ${breakMinutes} min`}
          </div>
        </div>

        <div className="sidebar">
          <div className="sidebar-header-row">
            <h2 className="sidebar-title">Task Queue</h2>
            <button className="add-btn" onClick={() => setShowAddTask((s) => !s)} aria-label="Add task">
              {showAddTask ? <X size={16} color="#fff" /> : <Plus size={16} color="#fff" />}
            </button>
          </div>

          {showAddTask && (
            <div className="add-task-row">
              <input
                autoFocus
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                placeholder="New task title"
                className="add-task-input"
              />
              <button className="add-task-confirm" onClick={addTask}>
                Add
              </button>
            </div>
          )}

          <div className="task-list">
            {activeTasks.map((task) => (
              <div
                key={task.id}
                className={task.current ? "task-card current" : "task-card"}
                onClick={() => selectTask(task.id)}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("text/plain", String(task.id))}
              >
                <div className="task-top-row">
                  <div style={{ flex: 1 }}>
                    {task.current && <p className="current-label">CURRENT TASK</p>}
                    <p className={task.done ? "task-title done" : "task-title"}>{task.title}</p>

                    {task.meta.type === "due" && (
                      <div className="meta-row">
                        <Calendar size={13} /> {task.meta.label}
                      </div>
                    )}
                    {task.meta.type === "tag" && <span className="tag-academic">{task.meta.label}</span>}
                    {task.meta.type === "priority" && <p className="priority-label">{task.meta.label}</p>}
                  </div>
                  <GripVertical size={16} className="drag-handle" />
                </div>
              </div>
            ))}
          </div>

          <div
            className={isDropHover ? "drop-zone hover" : "drop-zone"}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDropHover(true);
            }}
            onDragLeave={() => setIsDropHover(false)}
            onDrop={handleDrop}
          >
            <Archive size={20} />
            <span className="drop-zone-label">DROP HERE TO ARCHIVE</span>
          </div>

          <div className="spacer" />

          <div className="progress-section">
            <div className="progress-row">
              <span className="progress-label">SESSION PROGRESS</span>
              <span className="progress-value">
                {doneCount} / {tasks.length} Tasks
              </span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-bar">
        <div className="bottom-bar-inner">
          <div className="bottom-left">
            <div className="footer-dropdown-wrap">
              <button
                className="bottom-control"
                onClick={() => setThemeMenuOpen((s) => !s)}
              >
                <Palette size={16} /> {THEME_OPTIONS.find((o) => o.id === theme)?.label || "Theme"}
              </button>
              {themeMenuOpen && (
                <div className="footer-dropdown">
                  {THEME_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      className={opt.id === theme ? "footer-dropdown-item active" : "footer-dropdown-item"}
                      onClick={() => {
                        setTheme(opt.id);
                        setThemeMenuOpen(false);
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bottom-right">
            <button className="icon-btn" aria-label="Toggle fullscreen" onClick={toggleFullscreen}>
              <Maximize2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}