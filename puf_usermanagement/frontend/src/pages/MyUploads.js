import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './TutorialPage.css';

const MyUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [news, setNews] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingNewsId, setEditingNewsId] = useState(null);
  const [editedDescription, setEditedDescription] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [activeTab, setActiveTab] = useState('posts');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUserPosts();
    fetchUserNews();
  }, []);

  const fetchUserPosts = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (!currentUser) return;

      const res = await axios.get(`http://localhost:8080/api/posts/user/${currentUser.id}`);
      setUploads(res.data.reverse());
    } catch (error) {
      console.error("Failed to fetch uploads", error);
    }
  };

  const fetchUserNews = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (!currentUser) return;

      const res = await axios.get(`http://localhost:8080/api/news/user/${currentUser.id}`);
      console.log("Fetched news data:", res.data);
      setNews(res.data.reverse());
    } catch (error) {
      console.error("Failed to fetch news", error);
    }
  };

  const handleUpdatePost = async (postId) => {
    setIsLoading(true);
    try {
      await axios.put(`http://localhost:8080/api/posts/${postId}`, {
        description: editedDescription
      });
      setEditingPostId(null);
      setEditedDescription('');
      await fetchUserPosts();
    } catch (error) {
      console.error("Failed to update post", error);
      alert("Failed to update post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateNews = async (newsId) => {
    setIsLoading(true);
    try {
      console.log('Updating news with ID:', newsId);
      
      if (!newsId) {
        throw new Error('News ID is missing');
      }
  
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (!currentUser) {
        throw new Error('User not authenticated');
      }
      
      // Find the current news item to preserve its imageUrl
      const currentNewsItem = news.find(item => item.id === newsId);
      if (!currentNewsItem) {
        throw new Error('News item not found');
      }
  
      const response = await axios.put(
        `http://localhost:8080/api/news/${newsId}`,
        {
          title: editedTitle,
          description: editedDescription,
          userId: currentUser.id,
          imageUrl: currentNewsItem.imageUrl // Preserve the imageUrl
        }
      );
  
      console.log('Update response:', response.data);
      
      if (response.status === 200) {
        setEditingNewsId(null);
        setEditedTitle('');
        setEditedDescription('');
        await fetchUserNews();
      }
    } catch (error) {
      console.error("Update error details:", {
        error: error.response?.data || error.message,
        request: error.config
      });
      alert(`Update failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    
    try {
      await axios.delete(`http://localhost:8080/api/posts/${postId}`);
      await fetchUserPosts();
    } catch (error) {
      console.error("Failed to delete post", error);
      alert("Failed to delete post. Please try again.");
    }
  };

  const handleDeleteNews = async (newsId) => {
    if (!window.confirm("Are you sure you want to delete this news item?")) return;
    
    try {
      await axios.delete(`http://localhost:8080/api/news/${newsId}`);
      await fetchUserNews();
    } catch (error) {
      console.error("Failed to delete news", error);
      alert("Failed to delete news. Please try again.");
    }
  };

  const startEditingPost = (post) => {
    setEditingPostId(post.id);
    setEditedDescription(post.description);
  };

  const startEditingNews = (newsItem) => {
    console.log("News item being edited:", newsItem);
    console.log("News ID:", newsItem.id);
    setEditingNewsId(newsItem.id);
    setEditedTitle(newsItem.title);
    setEditedDescription(newsItem.description);
  };

  const cancelEditing = () => {
    setEditingPostId(null);
    setEditingNewsId(null);
    setEditedDescription('');
    setEditedTitle('');
  };

  return (
    <div className="tutorial-page">
      <Navbar />
      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Your Uploads</h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveTab('posts')} 
          className={`tab-button ${activeTab === 'posts' ? 'active' : ''}`}
        >
          Your Posts
        </button>
        <button 
          onClick={() => setActiveTab('news')} 
          className={`tab-button ${activeTab === 'news' ? 'active' : ''}`}
        >
          Your News
        </button>
      </div>

      <div className="post-feed">
        {activeTab === 'posts' ? (
          uploads.length === 0 ? (
            <p style={{ textAlign: 'center' }}>You haven't uploaded any posts yet.</p>
          ) : (
            uploads.map(post => (
              <div className="post" key={post.id}>
                {editingPostId === post.id ? (
                  <>
                    <textarea
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      style={{ width: '100%', minHeight: '100px' }}
                      disabled={isLoading}
                    />
                    <div className="action-buttons">
                      <button 
                        onClick={() => handleUpdatePost(post.id)}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Saving...' : 'Save'}
                      </button>
                      <button 
                        onClick={cancelEditing}
                        disabled={isLoading}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p>{post.description}</p>
                    {post.imageUrl && <img src={`http://localhost:8080${post.imageUrl}`} alt="Post" />}
                    {post.videoUrl && (
                      <video controls width="100%">
                        <source src={`http://localhost:8080${post.videoUrl}`} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                    <div className="action-buttons">
                      <button onClick={() => startEditingPost(post)}>Edit</button>
                      <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                    </div>
                  </>
                )}
              </div>
            ))
          )
        ) : (
          news.length === 0 ? (
            <p style={{ textAlign: 'center' }}>You haven't uploaded any news yet.</p>
          ) : (
            news.map(newsItem => (
              <div className="post" key={newsItem.id}>
                {editingNewsId === newsItem.id ? (
                  <>
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      style={{ width: '100%', marginBottom: '10px' }}
                      disabled={isLoading}
                    />
                    <textarea
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      style={{ width: '100%', minHeight: '100px' }}
                      disabled={isLoading}
                    />
                    <div className="action-buttons">
                      <button 
                        onClick={() => handleUpdateNews(newsItem.id)}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Saving...' : 'Save'}
                      </button>
                      <button 
                        onClick={cancelEditing}
                        disabled={isLoading}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3>{newsItem.title}</h3>
                    <p>{newsItem.description}</p>
                    {newsItem.imageUrl && <img src={`http://localhost:8080${newsItem.imageUrl}`} alt="News" />}
                    <div className="action-buttons">
                      <button onClick={() => startEditingNews(newsItem)}>Edit</button>
                      <button onClick={() => handleDeleteNews(newsItem.id)}>Delete</button>
                    </div>
                  </>
                )}
              </div>
            ))
          )
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyUploads;