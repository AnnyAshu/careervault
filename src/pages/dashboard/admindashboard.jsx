import "../../styles/admindashboard.css";

export default function AdminDashboard() {
  return (
    <>
            <div className="dashboard-header">
              <h1>Dashboard Overview</h1>
              <span className="welcome-box">Welcome back, User Name!</span>
            </div>

            <div className="cards-grid">
              <div className="stat-card">
                <p className="card-title">Total Applications</p>
                <p className="card-count">122</p>
              </div>

              <div className="stat-card">
                <p className="card-title">Interviews Scheduled</p>
                <p className="card-count">120</p>
              </div>

              <div className="stat-card">
                <p className="card-title">Saved Jobs</p>
                <p className="card-count">36%</p>
              </div>

              <div className="stat-card">
                <p className="card-title">Learning Hours</p>
                <p className="card-count">131</p>
              </div>

              <div className="stat-card">
                <p className="card-title">React Learning Hours</p>
                <p className="card-count">101</p>
              </div>
            </div>

            <div className="recent-activity">
              <h2>Recent Activity</h2>
              <ul>
                <li>🔔 New Job Alert: Senior Software Developer, London.</li>
                <li>📊 Profile Completion is now 90%.</li>
                <li>📘 You started: Advanced React Hooks.</li>
                <li>🗣 Feedback received for “Tech Solutions Inc.”</li>
              </ul>
            </div>
          </>
  );
}
