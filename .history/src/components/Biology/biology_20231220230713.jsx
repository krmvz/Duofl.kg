// Biology.jsx

import React, { useState } from 'react';
import './biology.scss'; // Assuming you have a separate CSS file for Biology
import ReactPlayer from 'react-player';
import Footer from '../footer/footer';
import Header from '../header/header';

const Biology = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [homework, setHomework] = useState('');
  const [file, setFile] = useState(null);
  const [uploadTime, setUploadTime] = useState(null);
  const [videoHomework, setVideoHomework] = useState({});
  const [videoSubmittedHomework, setVideoSubmittedHomework] = useState({});
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const biologyVideos = [
    { id: 1, url: 'https://www.youtube.com/watch?v=8IlzKri08kk', title: 'Introduction to Cells', description: 'A comprehensive introduction to the structure and function of cells.' },
    { id: 2, url: 'https://www.youtube.com/watch?v=sQK3Yr4Sc_k', title: 'Photosynthesis Explained', description: 'Learn how plants convert sunlight into energy through the process of photosynthesis.' },
  ];

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleHomeworkChange = (event) => {
    setHomework(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmitHomework = (videoId) => {
    // Handle the submission of homework
    const currentTime = new Date().toLocaleTimeString();
    setUploadTime(currentTime);

    const newHomework = { ...videoHomework };
    const newSubmittedHomework = { ...videoSubmittedHomework };

    if (!newHomework[videoId]) {
      newHomework[videoId] = [];
    }

    newHomework[videoId].push(homework);
    newSubmittedHomework[videoId] = `Homework for "${biologyVideos.find(video => video.id === videoId).title}" (Submitted at ${currentTime}): ${homework}`;

    setVideoHomework(newHomework);
    setVideoSubmittedHomework(newSubmittedHomework);
    setHomework('');
    setFile(null);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div>
      <Header />
      <div className="sidebar" onClick={toggleSidebar}>
        <div className={`menu-icon ${sidebarVisible ? 'open' : ''}`}>&#9776;</div>
      </div>
      <div className={`content ${sidebarVisible ? 'shifted' : ''}`}>
        <h1>Biology Section</h1>
        <div>
          {biologyVideos.map(video => (
            <div key={video.id} className="video-container container">
              <h2>{video.title}</h2>
              <div className="player-wrapper">
                <ReactPlayer
                  url={video.url}
                  controls
                  width="100%"
                  height="300px"
                />
              </div>
              <p className={`description ${showDescription ? 'visible' : ''}`}>{video.description}</p>
              <div className="description-toggle" onClick={toggleDescription}>
                {showDescription ? 'Hide Description' : 'Show Description'}
              </div>

              {/* Homework Section */}
              <div className="homework-section">
                <textarea
                  placeholder="Type your homework here..."
                  value={homework}
                  onChange={handleHomeworkChange}
                />
                <input
                  type="file"
                  onChange={handleFileChange}
                />
                <button onClick={() => handleSubmitHomework(video.id)}>Submit Homework</button>
                {videoSubmittedHomework[video.id] && <p className="submitted-homework">{videoSubmittedHomework[video.id]}</p>}
                {uploadTime && <p className="upload-time">File uploaded at: {uploadTime}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Biology;
