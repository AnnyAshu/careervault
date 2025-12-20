import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext"; 
import "../../styles/profile.css";
import avatarProfile from "../../assets/images/avatar-female.png";

const Profile = () => {
  const { getUserProfile, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [notification, setNotification] = useState({ show: false, msg: "", type: "" });
  const { register, handleSubmit, reset, setValue } = useForm();

  // Handle showing and hiding messages automatically
  const triggerNotification = (msg, type = "success") => {
    setNotification({ show: true, msg, type });
    setTimeout(() => setNotification({ show: false, msg: "", type: "" }), 4000);
  };

  useEffect(() => {
    const loadData = async () => {
      const username = localStorage.getItem("username");
      const result = await getUserProfile(username);
      
      if (result.success) {
        const d = result.data;
        reset({
          firstname: d.firstname || "",
          lastname: d.lastname || "",
          email: d.email || "",
          mobilenumber: d.mobilenumber || "",
          location: d.location || "",
          aboutme: d.aboutme || ""
        });
        if (d.profileimage) setPreview(d.profileimage);
      }
    };
    loadData();
  }, [reset, getUserProfile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("profileImage", file);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("username", localStorage.getItem("username"));
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("mobilenumber", data.mobilenumber);
    formData.append("location", data.location);
    formData.append("aboutme", data.aboutme);

    if (data.profileImage) {
      formData.append("profileimage", data.profileImage);
    }

    const result = await updateUserProfile(formData);
    
    if (result.success) {
      triggerNotification("Profile updated successfully!");
    } else {
      triggerNotification(result.message || "Error updating profile", "error");
    }
    setLoading(false);
  };

  return (
    <div className="profile-main-container">
      {/* Toast Notification Replacement for Alert */}
      {notification.show && (
        <div className={`notification-toast ${notification.type}`}>
          {notification.msg}
        </div>
      )}

      <div className="profile-header">
        <h2>Account Settings</h2>
        <p>Manage your public profile and personal information</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="profile-form-card">
        <div className="profile-grid-layout">
          
          {/* Avatar Section */}
          <div className="profile-photo-column">
            <div className="avatar-preview-wrapper">
              <img src={preview || avatarProfile} alt="User" />
              <input type="file" id="imgInp" hidden onChange={handleImageChange} />
              <button 
                type="button" 
                className="btn-upload" 
                onClick={() => document.getElementById('imgInp').click()}
              >
                Change Photo
              </button>
            </div>
          </div>

          {/* Form Fields Section */}
          <div className="profile-details-column">
            <div className="field-row">
              <div className="field-group">
                <label>First Name</label>
                <input type="text" {...register("firstname")} placeholder="First Name" />
              </div>
              <div className="field-group">
                <label>Last Name</label>
                <input type="text" {...register("lastname")} placeholder="Last Name" />
              </div>
            </div>

            <div className="field-group">
              <label>Email Address</label>
              <input type="email" {...register("email")} readOnly className="read-only-input" />
            </div>

            <div className="field-row">
              <div className="field-group">
                <label>Phone Number</label>
                <input 
                  type="text" 
                  maxLength={10} 
                  {...register("mobilenumber", {
                    onChange: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, "")
                  })} 
                />
              </div>
              <div className="field-group">
                <label>Location</label>
                <input type="text" {...register("location")} placeholder="City, Country" />
              </div>
            </div>

            <div className="field-group">
              <label>About Me</label>
              <textarea {...register("aboutme")} rows="5" placeholder="Write a few lines about yourself..."></textarea>
            </div>

            <div className="form-footer">
              <button type="submit" className="btn-save" disabled={loading}>
                {loading ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;