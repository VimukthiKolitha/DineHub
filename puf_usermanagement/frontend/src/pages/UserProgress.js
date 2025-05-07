import React, { useEffect, useState } from 'react';
import { getProgress, updateProgress } from '../services/progressService';
import Navbar from '../components/Navbar';
import './UserProgress.css';

const UserProgress = () => {
  const [progress, setProgress] = useState({
    completedRecipes: [],
    savedRecipes: [],
    skillLevel: '',
  });
  const [newCompleted, setNewCompleted] = useState('');
  const [newSaved, setNewSaved] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [activeTab, setActiveTab] = useState('completed');

  useEffect(() => {
    const fetchProgress = async () => {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData && userData.id) {
        try {
          const response = await getProgress(userData.id);
          const data = response.data;
          setProgress(data.progress);
          setRecommendations(data.recommendations || []);
        } catch (error) {
          console.error("Failed to fetch progress", error);
        }
      }
    };
    fetchProgress();
  }, []);

  const updateUserProgress = async (updatedProgress) => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.id) {
      try {
        const response = await updateProgress(userData.id, updatedProgress);
        setProgress(response.data);
      } catch (error) {
        console.error("Update failed", error);
      }
    }
  };

  const handleAddCompleted = () => {
    if (newCompleted.trim() === '') return;
    const updatedCompleted = [...progress.completedRecipes, newCompleted.trim()];
    updateUserProgress({ 
      ...progress, 
      completedRecipes: updatedCompleted 
    });
    setNewCompleted('');
  };

  const handleAddSaved = () => {
    if (newSaved.trim() === '') return;
    const updatedSaved = [...progress.savedRecipes, newSaved.trim()];
    updateUserProgress({ 
      ...progress, 
      savedRecipes: updatedSaved 
    });
    setNewSaved('');
  };

  return (
    <div className="progress-tracker">
      <Navbar />
      <div className="progress-container">
        <header className="progress-header">
          <h1>My Cooking Journey</h1>
          <div className="skill-level">
            <span className="skill-label">Current Skill:</span>
            <span className={`skill-value ${progress.skillLevel.toLowerCase()}`}>
              {progress.skillLevel || "Beginner"}
            </span>
          </div>
        </header>

        <div className="progress-tabs">
          <button 
            className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            <i className="fas fa-check-circle"></i> Completed
          </button>
          <button 
            className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            <i className="fas fa-bookmark"></i> Saved
          </button>
          <button 
            className={`tab-btn ${activeTab === 'recommendations' ? 'active' : ''}`}
            onClick={() => setActiveTab('recommendations')}
          >
            <i className="fas fa-lightbulb"></i> Recommendations
          </button>
        </div>

        <div className="progress-content">
          {activeTab === 'completed' && (
            <div className="tab-panel">
              <div className="recipe-list">
                {progress.completedRecipes && progress.completedRecipes.length > 0 ? (
                  progress.completedRecipes.map((recipe, idx) => (
                    <div className="recipe-card completed" key={idx}>
                      <div className="recipe-icon">
                        <i className="fas fa-check"></i>
                      </div>
                      <div className="recipe-name">{recipe}</div>
                      <div className="recipe-date">Completed</div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <i className="fas fa-utensils"></i>
                    <p>No completed recipes yet</p>
                  </div>
                )}
              </div>
              <div className="add-recipe">
                <input 
                  type="text" 
                  placeholder="Add a completed recipe..." 
                  value={newCompleted}
                  onChange={(e) => setNewCompleted(e.target.value)}
                />
                <button className="add-btn" onClick={handleAddCompleted}>
                  <i className="fas fa-plus"></i> Add
                </button>
              </div>
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="tab-panel">
              <div className="recipe-list">
                {progress.savedRecipes && progress.savedRecipes.length > 0 ? (
                  progress.savedRecipes.map((recipe, idx) => (
                    <div className="recipe-card saved" key={idx}>
                      <div className="recipe-icon">
                        <i className="fas fa-bookmark"></i>
                      </div>
                      <div className="recipe-name">{recipe}</div>
                      <div className="recipe-date">Saved</div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <i className="fas fa-heart"></i>
                    <p>No saved recipes yet</p>
                  </div>
                )}
              </div>
              <div className="add-recipe">
                <input 
                  type="text" 
                  placeholder="Add a recipe to save..." 
                  value={newSaved}
                  onChange={(e) => setNewSaved(e.target.value)}
                />
                <button className="add-btn" onClick={handleAddSaved}>
                  <i className="fas fa-plus"></i> Add
                </button>
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="tab-panel">
              <div className="recipe-list">
                {recommendations && recommendations.length > 0 ? (
                  recommendations.map((rec, idx) => (
                    <div className="recipe-card recommendation" key={idx}>
                      <div className="recipe-icon">
                        <i className="fas fa-lightbulb"></i>
                      </div>
                      <div className="recipe-name">{rec}</div>
                      <div className="recipe-date">Recommended</div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <i className="fas fa-info-circle"></i>
                    <p>No recommendations available</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProgress;