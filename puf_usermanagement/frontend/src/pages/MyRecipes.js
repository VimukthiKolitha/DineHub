import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './MyRecipes.css'; // We'll create this new CSS file

const MyRecipes = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState(null);

  const formatDescription = (text) => {
    if (!text) return null;
    return text.split('\n').map((paragraph, index) => (
      <p key={index} style={{ marginBottom: '10px' }}>
        {paragraph || <br />} {/* This handles empty lines */}
      </p>
    ));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:8080/api/posts');
    setPosts(res.data.reverse());
  };

  const handleUpload = async () => {
    try {
      let imageUrl = null;
  
      if (image) {
        const imageFormData = new FormData();
        imageFormData.append("file", image);
  
        const imageUploadRes = await axios.post(
          "http://localhost:8080/api/posts/upload",
          imageFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        imageUrl = imageUploadRes.data;
      }
  
      const currentUser = JSON.parse(localStorage.getItem("user"));
      if (!currentUser || !currentUser.id) {
        alert("User not logged in.");
        return;
      }
  
      const payload = {
        userId: currentUser.id,
        description,
        imageUrl,
        createdAt: new Date().toISOString(),
      };
  
      await axios.post("http://localhost:8080/api/posts", payload);
      fetchPosts();
      setDescription('');
      setImage(null);
      setShowModal(false);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("An error occurred during upload.");
    }
  };

  const toggleDescription = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  return (
    <div className="my-recipes-page">
      <Navbar />

      <header className="recipes-hero">
        <h1>My Recipes</h1>
        <p>Share your delicious recipes.</p>
      </header>
      
      <div className="recipes-grid">
        {posts.filter(post => post.imageUrl).map((post) => (
          <div 
            className={`recipe-card ${expandedPostId === post.id ? 'expanded' : ''}`}
            key={post.id}
            onClick={() => toggleDescription(post.id)}
          >
            <div className="card-image">
              <img src={`http://localhost:8080${post.imageUrl}`} alt="Recipe" />
            </div>
            {expandedPostId === post.id && (
              <div className="card-description">
                {formatDescription(post.description)}
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="upload-fab" onClick={() => setShowModal(true)}>Upload Recipe</button>

      {showModal && (
        <div className="upload-modal">
          <div className="upload-box">
            <h3>Upload Recipe</h3>
            <textarea
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <input 
              type="file" 
              accept="image/*" 
              onChange={e => setImage(e.target.files[0])} 
            />
            <div className="upload-buttons">
              <button onClick={handleUpload}>Post</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MyRecipes;