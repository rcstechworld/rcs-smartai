"use client";

import { useState } from "react";

const reviews = [
  {
    name: "Rahul Sharma",
    rating: 5,
    time: "2 hours ago",
    text: "Excellent service and very helpful staff. Got my laptop repaired quickly.",
    reply:
      "Thank you Rahul for your kind words! We're glad you had a great experience with our service.",
    status: "Needs approval",
  },
  {
    name: "Neha Verma",
    rating: 4,
    time: "Yesterday",
    text: "Good service and reasonable experience. Staff was supportive.",
    reply:
      "Thank you Neha for sharing your experience. We really appreciate your feedback.",
    status: "Needs approval",
  },
  {
    name: "Amit Kumar",
    rating: 3,
    time: "2 days ago",
    text: "Service was okay but took longer than expected.",
    reply:
      "Thank you for your feedback, Amit. We apologize for the delay and appreciate you bringing this to our attention.",
    status: "Needs approval",
  },
];

const posts = [
  {
    title: "5 Things to Check Before Buying a Laptop",
    category: "Helpful / Educational",
    status: "Draft ready",
  },
  {
    title: "How We Help Customers Choose the Right Device",
    category: "Trust / Customer Experience",
    status: "Draft ready",
  },
  {
    title: "Make Your Business More Productive With the Right Technology",
    category: "Business Growth",
    status: "Draft ready",
  },
];

export default function Home() {
  const [active, setActive] = useState("Dashboard");
  const [approved, setApproved] = useState([]);
  const [paused, setPaused] = useState(false);

  const menu = [
    ["Dashboard", "⌂"],
    ["Reviews", "★"],
    ["AI Replies", "✦"],
    ["Growth Posts", "◉"],
    ["Business Brain", "◈"],
    ["Settings", "⚙"],
  ];

  function approveReview(index) {
    setApproved((current) => [...current, index]);
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">R</div>
          <div>
            <div className="brand-name">RCS SmartAI</div>
            <div className="brand-subtitle">Your AI Business Manager</div>
          </div>
        </div>

        <div className="workspace">
          <div className="workspace-label">BUSINESS</div>
          <div className="business-card">
            <div className="business-avatar">R</div>
            <div>
              <strong>RCS Tech World</strong>
              <span>Technology Business</span>
            </div>
            <span className="chevron">⌄</span>
          </div>
        </div>

        <nav className="nav">
          {menu.map(([name, icon]) => (
            <button
              key={name}
              className={`nav-item ${active === name ? "active" : ""}`}
              onClick={() => setActive(name)}
            >
              <span className="nav-icon">{icon}</span>
              <span>{name}</span>
              {name === "Reviews" && <b>3</b>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className={`ai-status ${paused ? "paused" : ""}`}>
            <span className="status-dot" />
            <div>
              <strong>AI Assistant</strong>
              <span>{paused ? "Paused" : "Active"}</span>
            </div>
          </div>

          <button className="help-button">? Help & Support</button>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div>
            <div className="mobile-brand">RCS SmartAI</div>
            <h1>{active}</h1>
            <p>
              {active === "Dashboard"
                ? "Here's what is happening with your business today."
                : "Manage your business presence with AI."}
            </p>
          </div>

          <div className="top-actions">
            <button
              className={`pause-button ${paused ? "resume" : ""}`}
              onClick={() => setPaused(!paused)}
            >
              {paused ? "▶ Resume AI" : "Ⅱ Pause AI"}
            </button>
            <div className="profile">
              <div className="profile-avatar">B</div>
              <div>
                <strong>Business Owner</strong>
                <span>Admin</span>
              </div>
            </div>
          </div>
        </header>

        {active === "Dashboard" && (
          <>
            <section className="welcome-banner">
              <div>
                <span className="eyebrow">AI BUSINESS MANAGER</span>
                <h2>Good morning 👋</h2>
                <p>
                  RCS SmartAI is helping you manage reviews, create useful
                  content and grow your online presence.
                </p>
              </div>
              <div className="banner-icon">✦</div>
            </section>

            <section className="stats">
              <Stat icon="★" value="4.6" label="Google Rating" detail="+0.2 this month" />
              <Stat icon="💬" value="12" label="Reviews" detail="3 need attention" />
              <Stat icon="📢" value="3" label="Posts Ready" detail="Waiting for approval" />
              <Stat icon="💡" value="5" label="AI Suggestions" detail="New opportunities" />
            </section>

            <div className="grid">
              <section className="panel reviews-panel">
                <div className="panel-header">
                  <div>
                    <span className="panel-kicker">CUSTOMER FEEDBACK</span>
                    <h3>Reviews needing attention</h3>
                  </div>
                  <button onClick={() => setActive("Reviews")} className="text-button">
                    View all →
                  </button>
                </div>

                <div className="review-list">
                  {reviews.map((review, index) => (
                    <div className="review" key={review.name}>
                      <div className="review-top">
                        <div className="review-avatar">
                          {review.name.charAt(0)}
                        </div>
                        <div className="review-author">
                          <strong>{review.name}</strong>
                          <span>{review.time}</span>
                        </div>
                        <div className="stars">
                          {"★".repeat(review.rating)}
                          {"☆".repeat(5 - review.rating)}
                        </div>
                      </div>

                      <p className="review-text">{review.text}</p>

                      <div className="ai-reply">
                        <div className="ai-label">
                          <span>✦</span> AI suggested reply
                        </div>
                        <p>{review.reply}</p>
                      </div>

                      <div className="review-actions">
                        {approved.includes(index) ? (
                          <span className="approved">✓ Approved for publishing</span>
                        ) : (
                          <>
                            <button className="secondary-button">Edit</button>
                            <button
                              className="primary-button"
                              onClick={() => approveReview(index)}
                            >
                              ✓ Approve & Publish
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <aside className="right-column">
                <section className="panel">
                  <div className="panel-header">
                    <div>
                      <span className="panel-kicker">GROWTH AI</span>
                      <h3>Posts ready</h3>
                    </div>
                    <button
                      className="text-button"
                      onClick={() => setActive("Growth Posts")}
                    >
                      View all →
                    </button>
                  </div>

                  {posts.map((post) => (
                    <div className="post-mini" key={post.title}>
                      <div className="post-icon">✦</div>
                      <div>
                        <strong>{post.title}</strong>
                        <span>{post.category}</span>
                      </div>
                    </div>
                  ))}

                  <button
                    className="full-button"
                    onClick={() => setActive("Growth Posts")}
                  >
                    + Generate Growth Post
                  </button>
                </section>

                <section className="panel brain-panel">
                  <span className="panel-kicker">BUSINESS BRAIN</span>
                  <h3>Help AI understand your business</h3>
                  <p>
                    Add your services, products, tone and business rules so AI
                    can create more accurate content.
                  </p>

                  <div className="progress">
                    <div className="progress-bar" />
                  </div>
                  <div className="progress-text">
                    <span>Business profile</span>
                    <strong>65%</strong>
                  </div>

                  <button
                    className="full-button dark"
                    onClick={() => setActive("Business Brain")}
                  >
                    Complete Business Brain →
                  </button>
                </section>
              </aside>
            </div>
          </>
        )}

        {active !== "Dashboard" && (
          <section className="placeholder-panel">
            <div className="placeholder-icon">
              {menu.find(([name]) => name === active)?.[1] || "✦"}
            </div>
            <span className="panel-kicker">RCS SMARTAI</span>
            <h2>{active}</h2>
            <p>
              This section is ready for the next implementation phase. The
              dashboard foundation and navigation are now working.
            </p>
            <button
              className="primary-button"
              onClick={() => setActive("Dashboard")}
            >
              ← Back to Dashboard
            </button>
          </section>
        )}

        <footer>
          <span>RCS SmartAI · Trial MVP</span>
          <span>Google Business Profile management with AI</span>
        </footer>
      </section>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #f6f7fb;
          color: #18202f;
          font-family:
            Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
            "Segoe UI", sans-serif;
        }

        button {
          font: inherit;
        }

        .app-shell {
          min-height: 100vh;
          display: flex;
          background: #f6f7fb;
        }

        .sidebar {
          width: 270px;
          min-height: 100vh;
          background: #101827;
          color: #fff;
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
        }

        .brand {
          display: flex;
          gap: 11px;
          align-items: center;
          padding: 4px 10px 28px;
        }

        .brand-mark {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          background: #6d5dfc;
          font-size: 21px;
          font-weight: 800;
        }

        .brand-name {
          font-size: 17px;
          font-weight: 750;
        }

        .brand-subtitle {
          margin-top: 2px;
          color: #98a4b8;
          font-size: 11px;
        }

        .workspace-label,
        .panel-kicker,
        .eyebrow {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
        }

        .workspace-label {
          color: #738097;
          padding: 0 10px 8px;
        }

        .business-card {
          border: 1px solid #273449;
          background: #182235;
          border-radius: 12px;
          padding: 10px;
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .business-avatar,
        .profile-avatar {
          display: grid;
          place-items: center;
          font-weight: 800;
        }

        .business-avatar {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          background: #e9e6ff;
          color: #594be0;
        }

        .business-card strong,
        .business-card span {
          display: block;
        }

        .business-card strong {
          font-size: 12px;
        }

        .business-card span {
          color: #8d9ab0;
          font-size: 10px;
          margin-top: 2px;
        }

        .chevron {
          margin-left: auto;
          color: #8390a4;
        }

        .nav {
          margin-top: 25px;
          display: grid;
          gap: 4px;
        }

        .nav-item {
          width: 100%;
          border: 0;
          background: transparent;
          color: #aeb9c9;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 12px;
          border-radius: 9px;
          cursor: pointer;
          text-align: left;
          font-size: 13px;
        }

        .nav-item:hover,
        .nav-item.active {
          background: #202c40;
          color: #fff;
        }

        .nav-item.active {
          box-shadow: inset 3px 0 #7c6cff;
        }

        .nav-icon {
          width: 19px;
          text-align: center;
          color: #8f9bb0;
        }

        .nav-item.active .nav-icon {
          color: #9b8fff;
        }

        .nav-item b {
          margin-left: auto;
          background: #f15b6c;
          color: white;
          font-size: 9px;
          min-width: 18px;
          height: 18px;
          border-radius: 20px;
          display: grid;
          place-items: center;
        }

        .sidebar-bottom {
          margin-top: auto;
        }

        .ai-status {
          display: flex;
          gap: 10px;
          align-items: center;
          padding: 12px;
          background: #162134;
          border-radius: 10px;
          margin-bottom: 9px;
        }

        .ai-status strong,
        .ai-status span {
          display: block;
        }

        .ai-status strong {
          font-size: 11px;
        }

        .ai-status span {
          color: #7f8ca0;
          font-size: 10px;
          margin-top: 2px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #36d399 !important;
          box-shadow: 0 0 0 4px rgba(54, 211, 153, 0.1);
        }

        .paused .status-dot {
          background: #f59e0b !important;
        }

        .help-button {
          width: 100%;
          border: 0;
          background: transparent;
          color: #8491a5;
          text-align: left;
          padding: 10px 12px;
          cursor: pointer;
          font-size: 11px;
        }

        .content {
          margin-left: 270px;
          width: calc(100% - 270px);
          min-height: 100vh;
          padding: 30px 38px 20px;
        }

        .topbar {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 25px;
        }

        .topbar h1 {
          margin: 0;
          font-size: 25px;
          letter-spacing: -0.03em;
        }

        .topbar p {
          margin: 5px 0 0;
          color: #778197;
          font-size: 12px;
        }

        .mobile-brand {
          display: none;
        }

        .top-actions {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .pause-button {
          border: 1px solid #e1e4eb;
          background: #fff;
          color: #505b6d;
          border-radius: 8px;
          padding: 9px 13px;
          font-size: 11px;
          cursor: pointer;
        }

        .pause-button.resume {
          color: #176b4b;
          border-color: #b9e8d5;
          background: #f1fff8;
        }

        .profile {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .profile-avatar {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: #e9e6ff;
          color: #5d50df;
        }

        .profile strong,
        .profile span {
          display: block;
        }

        .profile strong {
          font-size: 11px;
        }

        .profile span {
          color: #8993a4;
          font-size: 9px;
          margin-top: 2px;
        }

        .welcome-banner {
          min-height: 155px;
          border-radius: 16px;
          padding: 28px 32px;
          color: white;
          background: linear-gradient(110deg, #4d43bd, #7569ed);
          display: flex;
          justify-content: space-between;
          align-items: center;
          overflow: hidden;
          position: relative;
        }

        .welcome-banner:after {
          content: "";
          width: 260px;
          height: 260px;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 50%;
          position: absolute;
          right: -60px;
          top: -80px;
        }

        .welcome-banner .eyebrow {
          color: #d8d4ff;
        }

        .welcome-banner h2 {
          margin: 7px 0 5px;
          font-size: 27px;
          letter-spacing: -0.03em;
        }

        .welcome-banner p {
          max-width: 650px;
          margin: 0;
          color: #e2e0ff;
          font-size: 12px;
          line-height: 1.7;
        }

        .banner-icon {
          font-size: 64px;
          color: rgba(255,255,255,.8);
          padding-right: 40px;
          position: relative;
          z-index: 1;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 13px;
          margin: 15px 0;
        }

        .stat {
          background: white;
          border: 1px solid #e7e9ef;
          border-radius: 13px;
          padding: 17px;
        }

        .stat-icon {
          font-size: 15px;
          color: #6d5dfc;
        }

        .stat-value {
          margin-top: 8px;
          font-size: 23px;
          font-weight: 800;
        }

        .stat-label {
          margin-top: 2px;
          color: #4f596a;
          font-size: 11px;
          font-weight: 700;
        }

        .stat-detail {
          margin-top: 6px;
          color: #8791a2;
          font-size: 9px;
        }

        .grid {
          display: grid;
          grid-template-columns: minmax(0, 1.7fr) minmax(290px, .9fr);
          gap: 15px;
        }

        .right-column {
          display: grid;
          gap: 15px;
          align-content: start;
        }

        .panel {
          background: #fff;
          border: 1px solid #e5e8ef;
          border-radius: 14px;
          padding: 19px;
        }

        .panel-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 14px;
        }

        .panel-kicker {
          color: #8a94a7;
        }

        .panel h3 {
          margin: 4px 0 0;
          font-size: 15px;
        }

        .text-button {
          border: 0;
          background: transparent;
          color: #6256dc;
          cursor: pointer;
          font-size: 10px;
          font-weight: 700;
        }

        .review {
          border-top: 1px solid #edf0f4;
          padding: 17px 0;
        }

        .review:first-child {
          border-top: 0;
          padding-top: 5px;
        }

        .review-top {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .review-avatar {
          width: 31px;
          height: 31px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: #eef0ff;
          color: #6256dc;
          font-size: 11px;
          font-weight: 800;
        }

        .review-author {
          flex: 1;
        }

        .review-author strong,
        .review-author span {
          display: block;
        }

        .review-author strong {
          font-size: 11px;
        }

        .review-author span {
          color: #939baa;
          font-size: 9px;
          margin-top: 2px;
        }

        .stars {
          color: #f2a91b;
          font-size: 11px;
          letter-spacing: 1px;
        }

        .review-text {
          margin: 10px 0;
          color: #566072;
          font-size: 11px;
          line-height: 1.6;
        }

        .ai-reply {
          border: 1px solid #e4e1ff;
          background: #f8f7ff;
          border-radius: 9px;
          padding: 10px 12px;
        }

        .ai-label {
          color: #6559d9;
          font-size: 9px;
          font-weight: 800;
        }

        .ai-reply p {
          color: #4e5668;
          margin: 5px 0 0;
          font-size: 10px;
          line-height: 1.55;
        }

        .review-actions {
          margin-top: 9px;
          display: flex;
          justify-content: flex-end;
          gap: 7px;
          align-items: center;
        }

        .primary-button,
        .secondary-button,
        .full-button {
          border-radius: 7px;
          padding: 8px 11px;
          cursor: pointer;
          font-size: 10px;
          font-weight: 700;
        }

        .primary-button {
          border: 0;
          background: #6559dd;
          color: white;
        }

        .secondary-button {
          border: 1px solid #e0e3e9;
          background: white;
          color: #5e6879;
        }

        .approved {
          color: #14865b;
          font-size: 10px;
          font-weight: 700;
        }

        .post-mini {
          display: flex;
          gap: 9px;
          padding: 11px 0;
          border-top: 1px solid #edf0f4;
        }

        .post-icon {
          width: 28px;
          height: 28px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 7px;
          background: #f0efff;
          color: #6559dd;
          font-size: 11px;
        }

        .post-mini strong,
        .post-mini span {
          display: block;
        }

        .post-mini strong {
          font-size: 10px;
          line-height: 1.35;
        }

        .post-mini span {
          color: #8c95a5;
          font-size: 8px;
          margin-top: 3px;
        }

        .full-button {
          width: 100%;
          border: 1px solid #dedff0;
          background: #fafaff;
          color: #6256dc;
          margin-top: 8px;
        }

        .full-button.dark {
          background: #1b2434;
          border-color: #1b2434;
          color: white;
        }

        .brain-panel p {
          color: #778195;
          font-size: 10px;
          line-height: 1.6;
        }

        .progress {
          height: 6px;
          border-radius: 10px;
          background: #eceef3;
          overflow: hidden;
        }

        .progress-bar {
          width: 65%;
          height: 100%;
          background: #6b5fe1;
          border-radius: inherit;
        }

        .progress-text {
          display: flex;
          justify-content: space-between;
          color: #858e9f;
          font-size: 9px;
          margin: 5px 0 9px;
        }

        .placeholder-panel {
          min-height: 450px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          background: white;
          border: 1px solid #e5e8ef;
          border-radius: 16px;
          padding: 40px;
        }

        .placeholder-icon {
          width: 60px;
          height: 60px;
          display: grid;
          place-items: center;
          border-radius: 16px;
          background: #eeecff;
          color: #6358dc;
          font-size: 25px;
          margin-bottom: 17px;
        }

        .placeholder-panel h2 {
          margin: 7px 0;
        }

        .placeholder-panel p {
          max-width: 450px;
          color: #778195;
          font-size: 12px;
          line-height: 1.7;
          margin-bottom: 20px;
        }

        footer {
          display: flex;
          justify-content: space-between;
          color: #9aa2b0;
          font-size: 9px;
          padding: 18px 2px 0;
        }

        @media (max-width: 1000px) {
          .sidebar {
            width: 220px;
          }

          .content {
            margin-left: 220px;
            width: calc(100% - 220px);
            padding: 25px;
          }

          .grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 760px) {
          .sidebar {
            position: static;
            width: 100%;
            min-height: auto;
          }

          .app-shell {
            display: block;
          }

          .content {
            margin-left: 0;
            width: 100%;
            padding: 20px;
          }

          .sidebar {
            display: none;
          }

          .mobile-brand {
            display: block;
            color: #6256dc;
            font-weight: 800;
            font-size: 12px;
            margin-bottom: 7px;
          }

          .stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .top-actions .profile {
            display: none;
          }

          .welcome-banner {
            padding: 22px;
          }

          .banner-icon {
            display: none;
          }

          footer {
            display: block;
          }

          footer span {
            display: block;
            margin-bottom: 4px;
          }
        }
      `}</style>
    </main>
  );
}

function Stat({ icon, value, label, detail }) {
  return (
    <div className="stat">
      <div className="stat-icon">{icon}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-detail">{detail}</div>
    </div>
  );
}
