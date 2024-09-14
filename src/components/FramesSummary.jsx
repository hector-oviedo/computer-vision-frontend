// src/components/FramesSummary.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const FramesSummary = () => {
  const frames = useSelector((state) => state.config.frames);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
      <h3 className="text-lg font-semibold mb-2">Frames</h3>
      {frames && frames.length > 0 ? (
        <p className="text-gray-700 dark:text-gray-300">
          {frames.length} frame(s) loaded.
        </p>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No frames loaded.</p>
      )}
    </div>
  );
};

export default FramesSummary;
