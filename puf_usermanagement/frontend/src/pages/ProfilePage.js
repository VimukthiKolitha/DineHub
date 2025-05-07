// ProfilePage.js
import React, { useState, useEffect } from 'react';
import { getUser, updateUser, deleteUser } from '../services/userService';
import './ProfilePage.css';
import Navbar from '../components/Navbar';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState('/default-profile.png');
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    dob: '',
    gender: '',
    country: '',
    cuisine: '',
    experience: '',
    interest: '',
    bio: '',
    skill: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        
        if (storedUser && storedUser.id) {
          const response = await getUser(storedUser.id);
          const userData = response.data;
          
          setUser({
            id: userData.id,
            name: userData.name || '',
            email: userData.email || '',
            dob: userData.dob || '',
            gender: userData.gender || '',
            country: userData.country || '',
            cuisine: userData.cuisine || '',
            experience: userData.experience || '',
            interest: userData.interest || '',
            bio: userData.bio || '',
            skill: userData.skill || '',
          });
          
          if (userData.profileImage) {
            setProfileImage(userData.profileImage);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const updatedUser = {
        ...user,
        profileImage,
      };

      const response = await updateUser(user.id, updatedUser);
      
      // Update local storage with new profile image along with other details
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const updatedStoredUser = {
        ...storedUser,
        name: updatedUser.name,
        email: updatedUser.email,
        profileImage: updatedUser.profileImage,  // include updated profile image
      };
      localStorage.setItem('user', JSON.stringify(updatedStoredUser));
      
      // Dispatch a custom event so that Navbar (or any other listener) can update immediately
      window.dispatchEvent(new CustomEvent('userUpdated'));

      setUser(response.data);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update profile');
    }
  };

  const handleDelete = async () => {
    const confirmation = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    if (confirmation) {
      try {
        await deleteUser(user.id);
        localStorage.removeItem('user');
        alert('Account deleted successfully.');
        window.location.href = '/';
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Failed to delete account');
      }
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-container">
        <div className={`profile-card ${isEditing ? 'edit-mode' : ''}`}>
          <div className="profile-header">
            <h1>{isEditing ? 'Edit Profile' : 'My Profile'}</h1>
            {!isEditing && (
              <button className="edit-btn" onClick={toggleEdit}>
                <i className="fas fa-edit"></i> Edit Profile
              </button>
            )}
          </div>
          
          <div className="profile-content">
            <div className="profile-image-wrapper">
              <img src={profileImage} alt="Profile" className="profile-image" />
              {isEditing && (
                <label className="image-upload-btn">
                  <i className="fas fa-camera"></i> Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input"
                  />
                </label>
              )}
            </div>

            <div className="profile-info">
              {isEditing ? (
                <form className="profile-form">
                  <div className="form-grid">
                    <div className="input-group">
                      <label>Full Name</label>
                      <input 
                        type="text" 
                        value={user.name} 
                        name="name" 
                        onChange={handleChange} 
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="input-group">
                      <label>Email</label>
                      <input 
                        type="email" 
                        value={user.email} 
                        name="email" 
                        onChange={handleChange} 
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="input-group">
                      <label>Date of Birth</label>
                      <input 
                        type="date" 
                        name="dob" 
                        value={user.dob} 
                        onChange={handleChange} 
                      />
                    </div>
                    <div className="input-group">
                      <label>Gender</label>
                      <select name="gender" value={user.gender} onChange={handleChange}>
                        <option value="">Select Gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                      </select>
                    </div>
                    <div className="input-group">
                      <label>Country</label>
                      <input 
                        type="text" 
                        value={user.country} 
                        name="country" 
                        onChange={handleChange} 
                        placeholder="Enter your country"
                      />
                    </div>
                    <div className="input-group">
                      <label>Favorite Cuisine</label>
                      <input 
                        type="text" 
                        value={user.cuisine} 
                        name="cuisine" 
                        onChange={handleChange} 
                        placeholder="Enter your favorite cuisine"
                      />
                    </div>
                    <div className="input-group">
                      <label>Experience (years)</label>
                      <input 
                        type="number" 
                        value={user.experience} 
                        name="experience" 
                        onChange={handleChange} 
                        placeholder="Years of cooking experience"
                        min="0"
                      />
                    </div>
                    <div className="input-group">
                      <label>Cooking Skill</label>
                      <select name="skill" value={user.skill} onChange={handleChange}>
                        <option value="">Select your skill level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                  </div>
                  <div className="input-group full-width">
                    <label>Cooking Interests</label>
                    <input 
                      type="text" 
                      value={user.interest} 
                      name="interest" 
                      onChange={handleChange} 
                      placeholder="What are your cooking interests?"
                    />
                  </div>
                  <div className="input-group full-width">
                    <label>Bio</label>
                    <textarea 
                      name="bio" 
                      value={user.bio} 
                      onChange={handleChange} 
                      rows="4"
                      placeholder="Tell us about yourself and your cooking journey..."
                    />
                  </div>
                  <div className="form-actions">
                    <button type="button" className="cancel-btn" onClick={toggleEdit}>
                      Cancel
                    </button>
                    <button type="button" className="save-btn" onClick={handleSave}>
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="profile-details">
                  <h2 className="profile-name">{user.name}</h2>
                  <p className="profile-email">{user.email}</p>
                  
                  <div className="details-grid">
                    <div className="detail-item">
                      <span className="detail-label">Date of Birth</span>
                      <span className="detail-value">{user.dob || "Not provided"}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Gender</span>
                      <span className="detail-value">{user.gender || "Not provided"}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Country</span>
                      <span className="detail-value">{user.country || "Not provided"}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Favorite Cuisine</span>
                      <span className="detail-value">{user.cuisine || "Not provided"}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Experience</span>
                      <span className="detail-value">
                        {user.experience ? `${user.experience} years` : "Not provided"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Cooking Skill</span>
                      <span className="detail-value">{user.skill || "Not provided"}</span>
                    </div>
                  </div>
                  
                  <div className="detail-section">
                    <h3 className="section-title">Cooking Interests</h3>
                    <p className="section-content">{user.interest || "Not provided"}</p>
                  </div>
                  
                  <div className="detail-section">
                    <h3 className="section-title">About Me</h3>
                    <p className="section-content bio">{user.bio || "Not provided"}</p>
                  </div>

                  {/* Delete Account Button */}
                  <button className="delete-btn" onClick={handleDelete}>
                    Delete Account
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
