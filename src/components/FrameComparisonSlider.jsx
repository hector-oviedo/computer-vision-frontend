// src/components/FrameComparisonSlider.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const FrameComparisonSlider = ({ models, totalFrames, getImageUrl, units = '' }) => {
  const [currentFrame, setCurrentFrame] = useState(1); // Starting from frame 1

  const handleSliderChange = (event) => {
    setCurrentFrame(Number(event.target.value));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow mt-8">
      {/* Slider */}
      <input
        type="range"
        min="1"
        max={totalFrames}
        value={currentFrame}
        onChange={handleSliderChange}
        className="w-full"
      />
      <div className="flex flex-wrap mt-4 overflow-x-auto">
        {models.map((model, index) => (
          <div
            key={index}
            className="flex-1 min-w-[200px] mx-2 mb-4"
          >
            <h3 className="text-center text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              {model.name}
            </h3>
            <img
              src={getImageUrl(model, currentFrame)}
              alt={`Frame ${currentFrame} - ${model.name}`}
              className="w-full h-auto rounded"
              loading="lazy"
            />
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-1">
              Frame {currentFrame} {units}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// PropTypes validation
FrameComparisonSlider.propTypes = {
  models: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  totalFrames: PropTypes.number.isRequired,
  getImageUrl: PropTypes.func.isRequired,
  units: PropTypes.string, // units is now handled as an optional parameter with a default value
};

export default FrameComparisonSlider;
