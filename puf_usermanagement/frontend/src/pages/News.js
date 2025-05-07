import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './News.css';

const News = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [newsItems, setNewsItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [expandedItemId, setExpandedItemId] = useState(null);

  const formatDescription = (text) => {
    if (!text) return null;
    return text.split('\n').map((paragraph, index) => (
      <p key={index} style={{ marginBottom: '10px' }}>
        {paragraph || <br />}
      </p>
    ));
  };

  useEffect(() => {
    fetchNewsItems();
  }, []);

  const fetchNewsItems = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/news');
      console.log("Fetched all news items:", res.data);
      setNewsItems(res.data.reverse());
    } catch (error) {
      console.error("Error fetching news items:", error);
    }
  };

  const handleUpload = async () => {
    try {
      let imageUrl = null;
  
      if (image) {
        const imageFormData = new FormData();
        imageFormData.append("file", image);
  
        const imageUploadRes = await axios.post(
          "http://localhost:8080/api/news/upload",
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
        alert("Please log in to add news.");
        return;
      }
  
      const payload = {
        userId: currentUser.id,
        title,
        description,
        imageUrl,
        createdAt: new Date().toISOString(),
      };
  
      await axios.post("http://localhost:8080/api/news", payload);
      fetchNewsItems();
      setTitle('');
      setDescription('');
      setImage(null);
      setShowModal(false);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("An error occurred during upload.");
    }
  };

  const toggleDescription = (itemId) => {
    setExpandedItemId(expandedItemId === itemId ? null : itemId);
  };

  return (
    <div className="news-page">
      <Navbar />

      <header className="news-hero">
        <h1>Food News</h1>
        <p>Latest updates from the culinary world</p>
      </header>
      
      <div className="news-grid">
        {newsItems.filter(item => item.imageUrl).map((item) => (
          <div 
            className={`news-card ${expandedItemId === item.id ? 'expanded' : ''}`}
            key={item.id}
            onClick={() => toggleDescription(item.id)}
          >
            <div className="card-image">
              <img src={`http://localhost:8080${item.imageUrl}`} alt="News" />
            </div>
            <div className="card-title">{item.title}</div>
            {expandedItemId === item.id && (
              <div className="card-description">
                {formatDescription(item.description)}
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="add-news-btn" onClick={() => setShowModal(true)}>+</button>

      {showModal && (
        <div className="news-modal">
          <div className="news-upload-box">
            <h3>Add Food News</h3>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
            <input 
              type="file" 
              accept="image/*" 
              onChange={e => setImage(e.target.files[0])} 
            />
            <div className="upload-buttons">
              <button onClick={handleUpload}>Post News</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default News;