import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Features", to: "/#features-section" },
  { label: "About Us", to: "/#about-section" },
  { label: "Contact Us", to: "/#contact-section" },
  { label: "Study Resources", to: "/tasks" },
  { label: "My Profile", to: "/profile" },
];
const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const ICON_CHOICES = ["🔬", "Σ", "📜", "🧪", "📚", "🧬", "🗺️", "💻"];
const BORDER_CHOICES = ["#1A2B33", "#B08900", "#5B8FB0", "#7A5C8E", "#3E7A5E"];

const INITIAL_NOTEBOOKS = [
  {
    id: 1,
    icon: "🔬",
    updated: "UPDATED 2H AGO",
    title: "Biology",
    desc: "Cellular metabolism, DNA replication, and molecular genetics synthesis.",
    tagBg: "#EDE9E1",
    tagText: "12",
    tag2Bg: "#F3C969",
    tag2Text: "PDF",
    notesCount: 42,
    border: "#1A2B33",
  },
  {
    id: 2,
    icon: "Σ",
    updated: "UPDATED YESTERDAY",
    title: "Calculus III",
    desc: "Multi-variable functions, partial derivatives, and line integrals.",
    tagBg: "#EDE9E1",
    tagText: "8",
    tag2Bg: "#BFE0F2",
    tag2Text: "IMG",
    notesCount: 28,
    border: "#B08900",
  },
  {
    id: 3,
    icon: "📜",
    updated: "UPDATED 4D AGO",
    title: "Modern History",
    desc: "Analysis of post-industrial revolutions and global shift dynamics.",
    tagBg: "#EDE9E1",
    tagText: "15",
    tag2Bg: null,
    tag2Text: null,
    notesCount: 56,
    border: "#5B8FB0",
  },
];

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

const styles = {
  page: {
    backgroundColor: "#FBF7EE",
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
    maxWidth: "1152px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 32px",
    flexWrap: "wrap",
    gap: "12px",
  },
  brand: {
    fontSize: "14px",
    fontWeight: 700,
    letterSpacing: "0.04em",
    color: "#D9B94A",
    textDecoration: "none",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
    flexWrap: "wrap",
  },
  navLink: {
    fontSize: "14px",
    fontWeight: 500,
    color: "rgba(255,255,255,0.9)",
    textDecoration: "none",
  },
  navLinkActive: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#D9B94A",
    textDecoration: "none",
    borderBottom: "2px solid #D9B94A",
    paddingBottom: "4px",
  },
  loginBtn: {
    fontSize: "14px",
    fontWeight: 500,
    color: "rgba(255,255,255,0.9)",
    background: "none",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
  },
  main: {
    maxWidth: "1152px",
    width: "100%",
    margin: "0 auto",
    padding: "40px 32px 16px",
    flex: 1,
    boxSizing: "border-box",
  },
  eyebrow: {
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.1em",
    color: "#B08900",
    marginBottom: "12px",
  },
  welcomeRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "24px",
    flexWrap: "wrap",
  },
  h1: {
    fontSize: "48px",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
    color: "#1A2B33",
    margin: 0,
    cursor: "pointer",
  },
  nameInput: {
    fontSize: "48px",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
    color: "#1A2B33",
    background: "transparent",
    border: "none",
    borderBottom: "2px solid #D9B94A",
    outline: "none",
    maxWidth: "420px",
  },
  saveBtn: {
    fontSize: "14px",
    fontWeight: 600,
    padding: "6px 14px",
    borderRadius: "999px",
    backgroundColor: "#1A2B33",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  focusCard: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    minWidth: "340px",
  },
  focusLabel: {
    fontSize: "14px",
    color: "#8A8377",
    margin: 0,
  },
  focusInput: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#1A2B33",
    background: "transparent",
    border: "none",
    outline: "none",
    width: "100%",
    padding: 0,
  },
  timerBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    fontWeight: 600,
    padding: "4px 10px",
    borderRadius: "999px",
    backgroundColor: "#EDE9E1",
    color: "#6B655A",
    border: "none",
    cursor: "pointer",
    marginTop: "4px",
  },
  avatarWrap: {
    position: "relative",
    flexShrink: 0,
    marginLeft: "8px",
  },
  avatar: {
    width: "64px",
    height: "64px",
    borderRadius: "12px",
    objectFit: "cover",
    display: "block",
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: "-8px",
    right: "-8px",
    width: "28px",
    height: "28px",
    borderRadius: "999px",
    backgroundColor: "#1A2B33",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  dashboardCard: {
    borderRadius: "24px",
    marginTop: "40px",
    padding: "28px 32px 20px",
    backgroundColor: "#EDEAE2",
  },
  dashboardHeaderRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "16px",
  },
  h2: {
    fontSize: "24px",
    fontWeight: 800,
    color: "#1A2B33",
    margin: 0,
  },
  subText: {
    fontSize: "14px",
    color: "#6B655A",
    marginTop: "4px",
  },
  btnRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  exportBtn: {
    fontSize: "14px",
    fontWeight: 600,
    padding: "8px 16px",
    borderRadius: "999px",
    backgroundColor: "#fff",
    color: "#1A2B33",
    border: "none",
    cursor: "pointer",
  },
  trendsBtn: {
    fontSize: "14px",
    fontWeight: 600,
    padding: "8px 16px",
    borderRadius: "999px",
    backgroundColor: "#1A2B33",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  chartArea: {
    height: "256px",
    marginTop: "16px",
  },
  daysRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "16px",
    borderTop: "1px solid #D9D4C7",
  },
  dayBtn: (active) => ({
    fontSize: "12px",
    letterSpacing: "0.02em",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: active ? "#1A2B33" : "#A8A192",
    fontWeight: active ? 700 : 500,
  }),
  sectionHeaderRow: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    marginTop: "56px",
    marginBottom: "24px",
    flexWrap: "wrap",
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: 800,
    letterSpacing: "-0.01em",
    color: "#1A2B33",
    margin: 0,
    flexShrink: 0,
  },
  divider: {
    flex: 1,
    borderTop: "1px solid #D9D4C7",
    minWidth: "40px",
  },
  viewAllLink: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#1A2B33",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    flexShrink: 0,
  },
  notebookGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
  },
  notebookCard: (border) => ({
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "24px",
    borderLeft: `4px solid ${border}`,
    cursor: "pointer",
    boxSizing: "border-box",
  }),
  notebookTopRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notebookIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    backgroundColor: "#F4F1EA",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
  },
  notebookUpdated: {
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.02em",
    color: "#A8A192",
  },
  notebookTitle: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#1A2B33",
    margin: "20px 0 0",
  },
  notebookDesc: {
    fontSize: "14px",
    lineHeight: 1.6,
    color: "#6B655A",
    marginTop: "8px",
  },
  notebookTagsRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "20px",
    flexWrap: "wrap",
  },
  tagCount: (bg) => ({
    fontSize: "12px",
    fontWeight: 700,
    width: "24px",
    height: "24px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: bg,
    color: "#6B655A",
  }),
  tagType: (bg) => ({
    fontSize: "10px",
    fontWeight: 700,
    padding: "0 8px",
    height: "24px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: bg,
    color: "#1A2B33",
  }),
  notesCountText: {
    fontSize: "12px",
    color: "#8A8377",
    marginLeft: "4px",
  },
  addSubjectBtn: {
    marginTop: "24px",
    borderRadius: "16px",
    border: "2px dashed #D9D4C7",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 0",
    width: "100%",
    maxWidth: "380px",
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  addSubjectIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    backgroundColor: "#F4F1EA",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
  },
  addSubjectTitle: {
    fontWeight: 700,
    color: "#1A2B33",
    margin: 0,
  },
  addSubjectSub: {
    fontSize: "14px",
    color: "#8A8377",
    marginTop: "4px",
  },
  footer: {
    backgroundColor: "#F7EEDD",
    width: "100%",
    marginTop: "64px",
  },
  footerInner: {
    maxWidth: "1152px",
    margin: "0 auto",
    padding: "40px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "16px",
  },
  footerBrand: {
    fontWeight: 700,
    color: "#1A2B33",
    margin: 0,
  },
  footerCopy: {
    fontSize: "14px",
    color: "#6B655A",
    marginTop: "4px",
  },
  footerLinks: {
    display: "flex",
    gap: "32px",
    fontSize: "14px",
    color: "#1A2B33",
  },
  footerLink: {
    color: "#1A2B33",
    textDecoration: "none",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(26,43,51,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 24px",
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "24px",
    width: "100%",
    maxWidth: "420px",
    boxSizing: "border-box",
  },
  modalHeaderRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
  },
  modalTitle: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#1A2B33",
    margin: 0,
  },
  modalCloseBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },
  fieldLabel: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#8A8377",
  },
  fieldInput: {
    width: "100%",
    marginTop: "4px",
    marginBottom: "16px",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #D9D4C7",
    outline: "none",
    boxSizing: "border-box",
    fontSize: "14px",
  },
  fieldTextarea: {
    width: "100%",
    marginTop: "4px",
    marginBottom: "20px",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #D9D4C7",
    outline: "none",
    resize: "none",
    boxSizing: "border-box",
    fontSize: "14px",
    fontFamily: "inherit",
  },
  createBtn: {
    width: "100%",
    fontSize: "14px",
    fontWeight: 600,
    padding: "10px 16px",
    borderRadius: "999px",
    backgroundColor: "#1A2B33",
    color: "#fff",
    border: "none",
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

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerInner}>
        <div>
          <p style={styles.footerBrand}>StudyHub</p>
          <p style={styles.footerCopy}>© 2024 StudyHub. A Digital Sanctuary for Focus.</p>
        </div>
        <div style={styles.footerLinks}>
          <a href="#" style={styles.footerLink}>Privacy Policy</a>
          <a href="#" style={styles.footerLink}>Terms of Service</a>
          <a href="#" style={styles.footerLink}>Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default function ProfilePage() {
  const [userName, setUserName] = useState("Sarah J.");
  const [editingName, setEditingName] = useState(false);
  const [draftName, setDraftName] = useState(userName);

  const [focusSubject, setFocusSubject] = useState("Organic Chemistry");
  const [elapsedSeconds, setElapsedSeconds] = useState(42 * 60 + 15);
  const [running, setRunning] = useState(true);

  const [activeDayIndex, setActiveDayIndex] = useState(todayIndex());

  const [notebooks, setNotebooks] = useState(INITIAL_NOTEBOOKS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  function saveName() {
    setUserName(draftName.trim() || userName);
    setEditingName(false);
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

  return (
    <div style={styles.page}>
      <NavBar />

      <main style={styles.main}>
        <p style={styles.eyebrow}>DIGITAL SANCTUARY DASHBOARD</p>

        <div style={styles.welcomeRow}>
          <div>
            {editingName ? (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  autoFocus
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveName()}
                  style={styles.nameInput}
                />
                <button onClick={saveName} style={styles.saveBtn}>
                  Save
                </button>
              </div>
            ) : (
              <h1
                style={styles.h1}
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

          <Link to="/focus-session" style={{ ...styles.focusCard, textDecoration: "none", color: "inherit", cursor: "pointer" }}>
            <div>
              <div style={{ ...styles.focusLabel, display: "inline-flex", textDecoration: "none", color: "#6B655A" }}>
                Current Focus Session
              </div>
              <input
                value={focusSubject}
                onChange={(e) => setFocusSubject(e.target.value)}
                style={styles.focusInput}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setRunning((r) => !r);
                }}
                style={styles.timerBtn}
                title={running ? "Pause session" : "Resume session"}
              >
                <span aria-hidden="true">⏱</span> {formatTime(elapsedSeconds)}
              </button>
            </div>
            <div style={styles.avatarWrap}>
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=faces"
                alt={userName}
                style={styles.avatar}
              />
              <button
                style={styles.editAvatarBtn}
                aria-label="Edit profile photo"
                onClick={() => {
                  setDraftName(userName);
                  setEditingName(true);
                }}
              >
                <span aria-hidden="true" style={{ color: "#fff" }}>✎</span>
              </button>
            </div>
          </Link>
        </div>

        <div style={styles.dashboardCard}>
          <div style={styles.dashboardHeaderRow}>
            <div>
              <h2 style={styles.h2}>Weekly Study Dashboard</h2>
              <p style={styles.subText}>Focus intensity over the last 7 days</p>
            </div>
            <div style={styles.btnRow}>
              <button onClick={() => window.print()} style={styles.exportBtn}>
                Export PDF
              </button>
              <button
                onClick={() =>
                  alert(`Trends: you selected ${DAYS[activeDayIndex]}. Keep building your streak!`)
                }
                style={styles.trendsBtn}
              >
                View Trends
              </button>
            </div>
          </div>

          <div style={styles.chartArea} />

          <div style={styles.daysRow}>
            {DAYS.map((d, i) => (
              <button key={d} onClick={() => setActiveDayIndex(i)} style={styles.dayBtn(i === activeDayIndex)}>
                {d}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.sectionHeaderRow}>
          <h2 style={styles.sectionTitle}>MY NOTEBOOKS</h2>
          <div style={styles.divider} />
          <Link to="/tasks" style={styles.viewAllLink}>
            View All <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div style={styles.notebookGrid}>
          {notebooks.map((nb) => (
            <div
              key={nb.id}
              style={styles.notebookCard(nb.border)}
              onClick={() => bumpNotes(nb.id)}
              title="Click to log a new note"
            >
              <div style={styles.notebookTopRow}>
                <div style={styles.notebookIcon}>{nb.icon}</div>
                <span style={styles.notebookUpdated}>{nb.updated}</span>
              </div>

              <p style={styles.notebookTitle}>{nb.title}</p>
              <p style={styles.notebookDesc}>{nb.desc}</p>

              <div style={styles.notebookTagsRow}>
                <span style={styles.tagCount(nb.tagBg)}>{nb.tagText}</span>
                {nb.tag2Text && <span style={styles.tagType(nb.tag2Bg)}>{nb.tag2Text}</span>}
                <span style={styles.notesCountText}>{nb.notesCount} Active Notes</span>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => setShowAddModal(true)} style={styles.addSubjectBtn}>
          <span style={styles.addSubjectIcon}>
            <span aria-hidden="true" style={{ color: "#1A2B33" }}>+</span>
          </span>
          <p style={styles.addSubjectTitle}>New Subject</p>
          <p style={styles.addSubjectSub}>Add a new academic sanctuary</p>
        </button>
      </main>

      <Footer />

      {showAddModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeaderRow}>
              <h3 style={styles.modalTitle}>New Subject</h3>
              <button onClick={() => setShowAddModal(false)} style={styles.modalCloseBtn} aria-label="Close">
                <span aria-hidden="true" style={{ color: "#8A8377" }}>×</span>
              </button>
            </div>
            <label style={styles.fieldLabel}>Subject name</label>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Physics II"
              style={styles.fieldInput}
            />
            <label style={styles.fieldLabel}>Description</label>
            <textarea
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="What will you study here?"
              style={styles.fieldTextarea}
              rows={3}
            />
            <button onClick={addNotebook} style={styles.createBtn}>
              Create Notebook
            </button>
          </div>
        </div>
      )}
    </div>
  );
}