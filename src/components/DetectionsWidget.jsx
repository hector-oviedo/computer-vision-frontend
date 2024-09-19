// src/components/DetectionsWidget.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GaugeWidget from './GaugeWidget';
import DetectionsList from './DetectionsList';

const DetectionsWidget = ({ models, totalFrames }) => {
  const [currentFrame, setCurrentFrame] = useState(1);

  const handleSliderChange = (event) => {
    setCurrentFrame(Number(event.target.value));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow mt-8">
      <h2 className="text-center text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Detections in frame {currentFrame}
      </h2>
      
      {/* Slider */}
      <input
        type="range"
        min="1"
        max={totalFrames}
        value={currentFrame}
        onChange={handleSliderChange}
        className="w-full"
      />
      <div className="flex flex-wrap mt-4">
        {models.map((model, index) => {
          const frameData = model.jsonData.frames[currentFrame - 1];
          const totalDetections = frameData?.detections.length || 0;

          return (
            <div key={index} className="flex-1 min-w-[200px] mx-2 mb-4">
              <h3 className="text-center text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {model.name}
              </h3>

              {/* Gauge for total detections */}
              <GaugeWidget
                modelName={model.name}
                metric="detections"
                metricName="Total Detections"
                minValue={0}
                maxValue={100}
                actualValue={totalDetections}
                label="Detections"
              />

              {/* Detections List */}
              <DetectionsList detections={frameData?.detections || []} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// PropTypes validation
DetectionsWidget.propTypes = {
  models: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      jsonData: PropTypes.object.isRequired,
    })
  ).isRequired,
  totalFrames: PropTypes.number.isRequired,
};

export default DetectionsWidget;
