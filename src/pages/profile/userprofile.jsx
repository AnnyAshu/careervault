import React from "react";
import "../../styles/profile.css";
const Profile = () => {
  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>

      <div className="profile-card">
        {/* LEFT - Avatar */}
        <div className="profile-left">
          <img
            src="/assets/profile-avatar.png"
            alt="User"
            className="profile-avatar"
          />
          <button className="upload-btn">Upload Photo</button>
        </div>

        {/* RIGHT - Details */}
        <div className="profile-right">
          <div className="profile-field">
            <label>Full Name</label>
            <input type="text" value="Ashish Singh" readOnly />
          </div>

          <div className="profile-field">
            <label>Email</label>
            <input type="email" value="ashish@example.com" readOnly />
          </div>

          <div className="profile-field">
            <label>Phone Number</label>
            <input type="text" value="+91 9876543210" readOnly />
          </div>

          <div className="profile-field">
            <label>Location</label>
            <input type="text" value="India" readOnly />
          </div>

          <button className="edit-btn">Edit Profile</button>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <div className="about-section">
        <h3>About Me</h3>
        <textarea
          readOnly
          value="7+ years experienced .NET Developer specializing in ASP.NET Core, C#, SQL Server, Azure and AWS."
        ></textarea>
      </div>
    </div>
  );
};

export default Profile;
