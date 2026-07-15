import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/profile.css";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "My Profile", to: "/profile" },
];

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const ICON_CHOICES = ["🔬", "Σ", "📜", "🧪", "📚", "🧬", "🗺️", "💻"];
const BORDER_CHOICES = ["#1A2B33", "#B08900", "#5B8FB0", "#7A5C8E", "#3E7A5E"];

// Cartoon avatar options the user can pick between when editing their profile.
// Only "seed" and "backgroundColor" are used here — these are the two options
// guaranteed to be valid on every DiceBear style, so the images always load.
const AVATAR_CHOICES = [
  {
    id: "boy-1",
    label: "Boy Avatar 1",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack&backgroundColor=b6e3f4",
  },
  {
    id: "boy-2",
    label: "Boy Avatar 2",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah&backgroundColor=c0aede",
  },
  {
    id: "girl-1",
    label: "Girl Avatar 1",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia&backgroundColor=ffd5dc",
  },
  {
    id: "girl-2",
    label: "Girl Avatar 2",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe&backgroundColor=ffdfba",
  },
];

const STORAGE_KEY = "studyhub_profile_v1";
const DASHBOARD_KEY = "studyhub_dashboard_v1";
const SESSION_MINUTES_DEFAULT = 25;
const BREAK_MINUTES_DEFAULT = 5;

// Shared with FocusSessionPage — this is what keeps "Current Focus Session"
// on the profile in sync with the actual timer page.
const FOCUS_SESSION_KEY = "studyhub_focus_session_v1";

function loadSavedProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function loadSharedSession() {
  try {
    const raw = localStorage.getItem(FOCUS_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function loadDashboardData() {
  try {
    const raw = localStorage.getItem(DASHBOARD_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function saveDashboardData(data) {
  try {
    localStorage.setItem(DASHBOARD_KEY, JSON.stringify(data));
  } catch (e) {
    // ignore storage errors
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

function formatTime(totalSeconds) {
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function todayIndex() {
  const jsDay = new Date().getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
}

function NavBar() {
  return (
    <header className="profile-nav">
      <div className="profile-nav-inner">
        <Link to="/" className="profile-brand">
          StudyHub
        </Link>
        <nav className="profile-nav-links">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`profile-nav-link ${item.label === "My Profile" ? "active" : ""}`}
            >
              {item.label}
            </Link>
             
          ))}
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="profile-footer">
      <div className="profile-footer-inner">
        <div>
          <p className="profile-footer-brand">StudyHub</p>
          <p className="profile-footer-copy">© 2024 StudyHub. A Digital Sanctuary for Focus.</p>
        </div>
        <div className="profile-footer-links">
          <a href="#" className="profile-footer-link">Privacy Policy</a>
          <a href="#" className="profile-footer-link">Terms of Service</a>
          <a href="#" className="profile-footer-link">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default function ProfilePage() {
  // Load any previously-saved profile data (name / avatar / notebooks).
  // Everything the user edits about their profile persists across visits;
  // the focus session itself always starts fresh, like a brand-new login.
  const saved = loadSavedProfile();

  const [userName, setUserName] = useState(saved?.name || "New Student");
  const [editingName, setEditingName] = useState(false);
  const [draftName, setDraftName] = useState(userName);

  const [avatarUrl, setAvatarUrl] = useState(saved?.avatarUrl || AVATAR_CHOICES[0].url);

  // Fresh login state: no focus subject typed yet
  const [focusSubject, setFocusSubject] = useState("");

  // The timer itself is shared with the Focus Session page. If no session has
  // ever been started, this stays zeroed out (a brand-new login); the moment
  // a session is started from either page, both pages stay in sync.
  const initialSession = resolveSharedSession();
  const [focusMinutes, setFocusMinutes] = useState(initialSession?.focusMinutes || SESSION_MINUTES_DEFAULT);
  const [breakMinutes, setBreakMinutes] = useState(initialSession?.breakMinutes || BREAK_MINUTES_DEFAULT);
  const [phase, setPhase] = useState(initialSession?.phase || "focus");
  const [elapsedSeconds, setElapsedSeconds] = useState(initialSession ? initialSession.secondsLeft : 0);
  const [running, setRunning] = useState(initialSession ? initialSession.running : false);

  // The task the user picked from the Task Queue on the Focus Session page.
  // When present, it replaces the "what are you studying today?" prompt.
  const sharedCurrentTask = (initialSession?.tasks || []).find((t) => t.current && !t.done);

  const [activeDayIndex, setActiveDayIndex] = useState(todayIndex());
  const [sessionCounts, setSessionCounts] = useState(() => {
    const savedDashboard = loadDashboardData();
    return savedDashboard?.sessionCounts || [0, 0, 0, 0, 0, 0, 0];
  });
  const [sessionCompleted, setSessionCompleted] = useState(false);

  // Fresh login state: no notebooks yet until the user creates their own
  const [notebooks, setNotebooks] = useState(saved?.notebooks || []);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  // Edit Profile modal (opened from the pencil icon on the avatar)
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editDraftName, setEditDraftName] = useState(userName);
  const [editDraftAvatar, setEditDraftAvatar] = useState(avatarUrl);

  useEffect(() => {
    if (!running) return;
    if (elapsedSeconds <= 0) {
      if (phase === "focus") {
        const day = new Date().getDay();
        const index = day === 0 ? 6 : day - 1;
        setSessionCounts((prev) => {
          const next = [...prev];
          next[index] = (next[index] || 0) + 1;
          return next;
        });
        setActiveDayIndex(index);
        setSessionCompleted(true);
        setPhase("break");
        setElapsedSeconds(breakMinutes * 60);
      } else {
        setPhase("focus");
        setElapsedSeconds(focusMinutes * 60);
        setRunning(false);
      }
      return;
    }
    const id = setInterval(() => setElapsedSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [running, elapsedSeconds, phase, breakMinutes, focusMinutes]);

  useEffect(() => {
    saveDashboardData({ sessionCounts });
  }, [sessionCounts]);

  // Persist profile data (name, avatar, notebooks) whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ name: userName, avatarUrl, notebooks })
      );
    } catch (e) {
      // ignore storage errors
    }
  }, [userName, avatarUrl, notebooks]);

  // Keep the shared focus session (used by the Focus Session page too) up to date.
  // The profile page doesn't own the task list, sound choice, or theme — merge with
  // whatever is already stored so this save doesn't wipe those out.
  useEffect(() => {
    const existing = loadSharedSession() || {};
    saveSharedSession({ ...existing, focusMinutes, breakMinutes, phase, secondsLeft: elapsedSeconds, running });
  }, [focusMinutes, breakMinutes, phase, elapsedSeconds, running]);

  function toggleSession() {
    setRunning((r) => {
      const next = !r;
      if (next && elapsedSeconds <= 0 && phase === "focus") {
        setElapsedSeconds(focusMinutes * 60);
      }
      if (!next) {
        setSessionCompleted(false);
      }
      return next;
    });
  }

  function saveName() {
    setUserName(draftName.trim() || userName);
    setEditingName(false);
  }

  function openEditProfileModal() {
    setEditDraftName(userName);
    setEditDraftAvatar(avatarUrl);
    setShowEditProfileModal(true);
  }

  function saveEditProfile() {
    setUserName(editDraftName.trim() || userName);
    setAvatarUrl(editDraftAvatar);
    setShowEditProfileModal(false);
  }

  function addNotebook() {
    if (!newTitle.trim()) return;
    const nextId = Math.max(0, ...notebooks.map((n) => n.id)) + 1;
    const icon = ICON_CHOICES[notebooks.length % ICON_CHOICES.length];
    const border = BORDER_CHOICES[notebooks.length % BORDER_CHOICES.length];
    setNotebooks((prev) => [
      ...prev,
      {
        id: nextId,
        icon,
        updated: "UPDATED JUST NOW",
        title: newTitle.trim(),
        desc: newDesc.trim() || "Add a description for this subject.",
        tagBg: "#EDE9E1",
        tagText: "0",
        tag2Bg: null,
        tag2Text: null,
        notesCount: 0,
        border,
      },
    ]);
    setNewTitle("");
    setNewDesc("");
    setShowAddModal(false);
  }

  function bumpNotes(id) {
    setNotebooks((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              notesCount: n.notesCount + 1,
              tagText: String(Number(n.tagText) + 1),
              updated: "UPDATED JUST NOW",
            }
          : n
      )
    );
  }

  function deleteNotebook(id, e) {
    e.stopPropagation();
    setNotebooks((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <div className="profile-page">
      <NavBar />

      <main className="profile-main">
        <p className="profile-eyebrow">DIGITAL SANCTUARY DASHBOARD</p>

        <div className="profile-welcome-row">
          <div>
            {editingName ? (
              <div className="profile-name-edit-row">
                <input
                  autoFocus
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveName()}
                  className="profile-name-input"
                />
                <button onClick={saveName} className="profile-save-btn">
                  Save
                </button>
              </div>
            ) : (
              <h1
                className="profile-h1"
                onClick={() => {
                  setDraftName(userName);
                  setEditingName(true);
                }}
                title="Click to edit your name"
              >
                Welcome back,
                <br />
                {userName}
              </h1>
            )}
          </div>

          <Link to="/focus-session" className="profile-focus-card">
            <div>
              <div className="profile-focus-label profile-focus-label-inline">
                Current Focus Session
              </div>
              {sharedCurrentTask ? (
                <p className="profile-focus-input">{sharedCurrentTask.title}</p>
              ) : (
                <input
                  value={focusSubject}
                  onChange={(e) => setFocusSubject(e.target.value)}
                  placeholder="What are you studying today?"
                  className="profile-focus-input"
                />
              )}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleSession();
                }}
                className="profile-timer-btn"
                title={running ? "Pause session" : "Resume session"}
              >
                <span aria-hidden="true">⏱</span> {formatTime(elapsedSeconds)}
              </button>
              {sessionCompleted && (
                <div className="profile-session-complete-pill">
                  ✅ Session completed
                </div>
              )}
            </div>
            <div className="profile-avatar-wrap">
              <img
                src={avatarUrl}
                alt={userName}
                className="profile-avatar"
              />
              <button
                className="profile-edit-avatar-btn"
                aria-label="Edit profile"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openEditProfileModal();
                }}
              >
                <span aria-hidden="true" style={{ color: "#fff" }}>✎</span>
              </button>
            </div>
          </Link>
        </div>

        <div className="profile-dashboard-card">
          <div className="profile-dashboard-header-row">
            <div>
              <h2 className="profile-h2">Study Activity</h2>
              <p className="profile-sub-text">Completed focus sessions this week</p>
            </div>
          </div>

          <div className="profile-activity-card">
            <div className="profile-activity-grid">
              {sessionCounts.map((count, index) => {
                const intensity = count === 0 ? 0 : count >= 3 ? 3 : count >= 2 ? 2 : 1;
                const colorClass = ["activity-empty", "activity-low", "activity-medium", "activity-high"][intensity];
                return (
                  <div key={DAYS[index]} className="profile-activity-cell">
                    <div
                      className={`profile-activity-square ${colorClass} ${index === activeDayIndex ? "active" : ""}`}
                      title={`${DAYS[index]}: ${count} session${count === 1 ? "" : "s"}`}
                    >
                      {count > 0 ? <span className="profile-activity-count">{count}</span> : null}
                    </div>
                    <span className="profile-activity-label">{DAYS[index]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="profile-section-header-row">
          <h2 className="profile-section-title">MY NOTEBOOKS</h2>
          <div className="profile-divider" />
          <Link to="/tasks" className="profile-view-all-link">
            View All <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="profile-notebook-grid">
          {notebooks.map((nb) => (
            <div
              key={nb.id}
              className="profile-notebook-card"
              style={{ borderLeft: `4px solid ${nb.border}` }}
              onClick={() => bumpNotes(nb.id)}
              title="Click to log a new note"
            >
              <div className="profile-notebook-top-row">
                <div className="profile-notebook-icon">{nb.icon}</div>
                <span className="profile-notebook-updated">{nb.updated}</span>
                <button
                  onClick={(e) => deleteNotebook(nb.id, e)}
                  className="profile-notebook-delete-btn"
                  aria-label={`Delete ${nb.title}`}
                  title="Delete notebook"
                >
                  <span aria-hidden="true">🗑</span>
                </button>
              </div>

              <p className="profile-notebook-title">{nb.title}</p>
              <p className="profile-notebook-desc">{nb.desc}</p>

              <div className="profile-notebook-tags-row">
                <span className="profile-tag-count" style={{ backgroundColor: nb.tagBg }}>{nb.tagText}</span>
                {nb.tag2Text && <span className="profile-tag-type" style={{ backgroundColor: nb.tag2Bg }}>{nb.tag2Text}</span>}
                <span className="profile-notes-count-text">{nb.notesCount} Active Notes</span>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => setShowAddModal(true)} className="profile-add-subject-btn">
          <span className="profile-add-subject-icon">
            <span aria-hidden="true" style={{ color: "#1A2B33" }}>+</span>
          </span>
          <p className="profile-add-subject-title">New Subject</p>
          <p className="profile-add-subject-sub">Add a new academic sanctuary</p>
        </button>
      </main>

      <Footer />

      {showAddModal && (
        <div className="profile-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="profile-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header-row">
              <h3 className="profile-modal-title">New Subject</h3>
              <button onClick={() => setShowAddModal(false)} className="profile-modal-close-btn" aria-label="Close">
                <span aria-hidden="true" style={{ color: "#8A8377" }}>×</span>
              </button>
            </div>
            <label className="profile-field-label">Subject name</label>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Physics II"
              className="profile-field-input"
            />
            <label className="profile-field-label">Description</label>
            <textarea
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="What will you study here?"
              className="profile-field-textarea"
              rows={3}
            />
            <button onClick={addNotebook} className="profile-create-btn">
              Create Notebook
            </button>
          </div>
        </div>
      )}

      {showEditProfileModal && (
        <div className="profile-modal-overlay" onClick={() => setShowEditProfileModal(false)}>
          <div className="profile-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header-row">
              <h3 className="profile-modal-title">Edit Profile</h3>
              <button onClick={() => setShowEditProfileModal(false)} className="profile-modal-close-btn" aria-label="Close">
                <span aria-hidden="true" style={{ color: "#8A8377" }}>×</span>
              </button>
            </div>

            <label className="profile-field-label">Choose an avatar</label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "10px",
                marginTop: "8px",
                marginBottom: "16px",
              }}
            >
              {AVATAR_CHOICES.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => setEditDraftAvatar(choice.url)}
                  title={choice.label}
                  aria-label={choice.label}
                  style={{
                    padding: "4px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    background: "transparent",
                    border:
                      editDraftAvatar === choice.url
                        ? "2px solid #D9B94A"
                        : "2px solid transparent",
                  }}
                >
                  <img
                    src={choice.url}
                    alt={choice.label}
                    style={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      borderRadius: "8px",
                      display: "block",
                    }}
                  />
                </button>
              ))}
            </div>

            <label className="profile-field-label">Name</label>
            <input
              value={editDraftName}
              onChange={(e) => setEditDraftName(e.target.value)}
              placeholder="Your name"
              className="profile-field-input"
            />

            <button onClick={saveEditProfile} className="profile-create-btn">
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}