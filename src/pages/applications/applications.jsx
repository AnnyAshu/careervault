import React, { useState } from "react";
import "../../styles/applications.css";
import avatarMale from "../../assets/images/avatar-male.png";
import avatarFemale from "../../assets/images/avatar-female.png";

const Applications = () => {
  const [search, setSearch] = useState("");

  const applications = [
    {
      id: 1,
      title: "Software Engineer",
      company: "TechCorp",
      status: "In Review",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "InnovateX",
      status: "Rejected",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Creatives Inc.",
      status: "Interview",
    },
    {
      id: 4,
      title: "Data Analyst",
      company: "DataWorks",
      status: "Accepted",
    },
    {
      id: 5,
      title: "Human Resources",
      company: "Peoplelytics",
      status: "In Review",
    },
  ];

  const filtered = applications.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  // Badge Color Logic
  const statusClass = (status) => {
    switch (status) {
      case "In Review":
        return "badge badge-review";
      case "Rejected":
        return "badge badge-rejected";
      case "Interview":
        return "badge badge-interview";
      case "Accepted":
        return "badge badge-accepted";
      default:
        return "badge";
    }
  };

  return (
    <div className="applications-container">
      <h2 className="applications-title">Applications</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Search applications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="applications-list">
        {filtered.map((app) => (
          <div className="application-card" key={app.id}>
            <img src={avatarFemale} className="app-avatar" alt="avatar" />

            <div className="app-info">
              <h3 className="app-title">{app.title}</h3>
              <p className="app-company">{app.company}</p>
            </div>

            <span className={statusClass(app.status)}>{app.status}</span>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="no-results">No applications found…</p>
        )}
      </div>
    </div>
  );
};

export default Applications;
