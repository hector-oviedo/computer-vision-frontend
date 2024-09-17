// src/components/FramesSummary.jsx
import React from 'react';
import PropTypes from 'prop-types';

const FramesSummary = ({ framesCount }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
      <h3 className="text-lg font-semibold mb-2">Frames</h3>
      {framesCount > 0 ? (
        <p className="text-gray-700 dark:text-gray-300">
          {framesCount} frame(s) loaded.
        </p>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No frames loaded.</p>
      )}
    </div>
  );
};

FramesSummary.propTypes = {
  framesCount: PropTypes.number.isRequired,
};

export default FramesSummary;