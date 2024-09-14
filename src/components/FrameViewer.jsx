// src/components/FrameViewer.jsx
"use client";

import React, { useState, useEffect } from 'react';

const FrameViewer = ({ frames, modelPredictions }) => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  const handleNextFrame = () => {
    setCurrentFrameIndex((prev) => (prev + 1) % frames.length);
  };

  const handlePrevFrame = () => {
    setCurrentFrameIndex((prev) =>
      prev === 0 ? frames.length - 1 : prev - 1
    );
  };

  const currentFramePath = frames[currentFrameIndex];

  // Function to load the frame image
  const [frameImageSrc, setFrameImageSrc] = useState('');

  useEffect(() => {
    // Assuming frames are accessible via relative paths
    // You may need to adjust this based on your setup
    setFrameImageSrc(`/${currentFramePath}`);
  }, [currentFramePath]);

  // ... code to overlay predictions ...

  return (
    <div className="frame-viewer">
      <div className="controls">
        <button onClick={handlePrevFrame}>Previous</button>
        <span>
          Frame {currentFrameIndex + 1} / {frames.length}
        </span>
        <button onClick={handleNextFrame}>Next</button>
      </div>
      <div className="frame-display relative">
        <img src={frameImageSrc} alt={`Frame ${currentFrameIndex + 1}`} />
        {/* Overlay predictions here */}
      </div>
    </div>
  );
};

export default FrameViewer;
