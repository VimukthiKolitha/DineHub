import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './TutorialPage.css';

const TutorialPage = () => {
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:8080/api/posts');
    setPosts(res.data.reverse()); // latest first
  };

  const handleUpload = async () => {
    try {
      if (video && video.duration > 30) {
        alert("Video must be under 30 seconds.");
        return;
      }
  
      let videoUrl = null;
  
      if (video) {
        const videoFormData = new FormData();
        videoFormData.append("file", video);
  
        const videoUploadRes = await axios.post(
          "http://localhost:8080/api/posts/upload",
          videoFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        videoUrl = videoUploadRes.data;
      }
  
      const currentUser = JSON.parse(localStorage.getItem("user"));
      if (!currentUser || !currentUser.id) {
        alert("User not logged in.");
        return;
      }
  
      const payload = {
        userId: currentUser.id,
        description,
        videoUrl,
        createdAt: new Date().toISOString(),
      };
  
      await axios.post("http://localhost:8080/api/posts", payload);
      fetchPosts();
      setDescription('');
      setVideo(null);
      setShowModal(false);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("An error occurred during upload.");
    }
  };

  return (
    <div className="tutorial-page">
      <Navbar />

      <header className="tutorial-hero">
        <h1>Cooking Tutorials</h1>
        <p>Share your cooking videos.</p>
      </header>

      <div className="post-feed">
        {posts.map((post, index) => (
          post.videoUrl && (
            <div className="post" key={index}>
              <p>{post.description}</p>
              <video controls width="100%">
                <source src={`http://localhost:8080${post.videoUrl}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )
        ))}
      </div>

      <button className="upload-fab" onClick={() => setShowModal(true)}>Upload Video</button>

      {showModal && (
        <div className="upload-modal">
          <div className="upload-box">
            <h3>Upload Video Tutorial</h3>
            <textarea
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <input
              type="file"
              accept="video/*"
              onChange={e => {
                const file = e.target.files[0];
                const videoElement = document.createElement("video");
                videoElement.preload = "metadata";
                videoElement.onloadedmetadata = () => {
                  if (videoElement.duration > 30) {
                    alert("Video too long. Max 30 seconds.");
                  } else {
                    setVideo(file);
                  }
                };
                videoElement.src = URL.createObjectURL(file);
              }}
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

export default TutorialPage;