// src/components/GroundTruthAnnotationWidget.jsx

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FrameRangeSelector from './FrameRangeSelector';
import FalseDetectionsWidget from './FalseDetectionsWidget';

const GroundTruthAnnotationWidget = ({ config, totalFrames, models }) => {
  const { rawFramesPath, COCO_LABELS } = config;

  // Initialize available and selected labels
  const [availableLabels, setAvailableLabels] = useState(Object.values(COCO_LABELS));
  const [selectedLabels, setSelectedLabels] = useState([]);

  // Frame range states are now managed by FrameRangeSelector
  const [frameRange, setFrameRange] = useState([0, totalFrames - 1]);
  const [currentFrame, setCurrentFrame] = useState(0);

  // Handlers to move labels between lists
  const handleAddLabel = (label) => {
    setSelectedLabels((prev) => [...prev, label]);
    setAvailableLabels((prev) => prev.filter((item) => item !== label));
  };

  const handleRemoveLabel = (label) => {
    setAvailableLabels((prev) => [...prev, label]);
    setSelectedLabels((prev) => prev.filter((item) => item !== label));
  };

  // Handler for frame preview slider
  const handleFrameSliderChange = (value) => {
    console.log('Current Frame Changed:', value);
    setCurrentFrame(value);
  };

  // Handler for FrameRangeSelector change end
  const handleFrameRangeChangeEnd = ([start, end]) => {
    console.log('Frame range changed (onChangeEnd):', start, end);
    // Update the current frame to the new start frame
    setCurrentFrame(start);
  };

  // Update frame range if totalFrames changes
  useEffect(() => {
    setFrameRange([0, totalFrames - 1]);
    setCurrentFrame(0);
    setAvailableLabels(Object.values(COCO_LABELS));
    setSelectedLabels([]);
  }, [totalFrames, COCO_LABELS]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md w-full max-w-12xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Manual Ground Truth Annotation in Range
      </h2>

      {/* Frame Range Selection */}
      <div className="mb-6">
      <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
          Select Range
        </label>
        <FrameRangeSelector
          min={0}
          max={totalFrames - 1}
          value={frameRange}
          onChange={setFrameRange}
          onChangeEnd={handleFrameRangeChangeEnd} // Pass the new prop
        />
      </div>

       {/* Frame Preview Slider */}
       <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
          Frame Preview:
        </label>
        <div className="flex flex-col items-center">
          <input
            type="range"
            min={frameRange[0]}
            max={frameRange[1]}
            value={currentFrame}
            onChange={(e) => handleFrameSliderChange(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-center mt-2 text-gray-700 dark:text-gray-300">
            Current Frame: {currentFrame}
          </p>
          {/* Frame Image */}
          <div className="mt-4 flex justify-center">
            <img
              src={`${rawFramesPath}/frame_${String(currentFrame).padStart(4, '0')}.png`}
              alt={`Frame ${currentFrame}`}
              className="max-w-full h-auto rounded-md shadow-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `${rawFramesPath}/placeholder.png`; // Fallback image
              }}
            />
          </div>
        </div>
      </div>

      {/* Label Selection */}
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
          Select the COCO present features in your selected range (actual {frameRange[0]} to {frameRange[1]})
        </label>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Available Labels */}
          <div className="w-full md:w-1/2">
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg h-40 overflow-y-auto p-2">
              {availableLabels.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">Possible Feature Labels.</p>
              ) : (
                availableLabels.map((label, index) => (
                  <div key={index} className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 dark:text-gray-300">{label}</span>
                    <button
                      onClick={() => handleAddLabel(label)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none"
                    >
                      Add
                    </button>
                  </div>
                ))
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Possible Feature Labels</p>
          </div>

          {/* Selected Labels */}
          <div className="w-full md:w-1/2">
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg h-40 overflow-y-auto p-2">
              {selectedLabels.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No Selected Labels.</p>
              ) : (
                selectedLabels.map((label, index) => (
                  <div key={index} className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 dark:text-gray-300">{label}</span>
                    <button
                      onClick={() => handleRemoveLabel(label)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 focus:outline-none"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Present Feature Labels in Range: {frameRange[0]} to {frameRange[1]} </p>
          </div>
        </div>
      </div>

      {/* FalseDetectionsWidget */}
      <div>
        <FalseDetectionsWidget
          models={models}
          selectedLabels={selectedLabels}
          frameRange={frameRange}
        />
      </div>
    </div>
  );
};

GroundTruthAnnotationWidget.propTypes = {
  config: PropTypes.shape({
    rawFramesPath: PropTypes.string.isRequired,
    COCO_LABELS: PropTypes.objectOf(PropTypes.string).isRequired,
    // Include other config properties if needed
  }).isRequired,
  totalFrames: PropTypes.number.isRequired,
  models: PropTypes.array.isRequired,
};

export default GroundTruthAnnotationWidget;
