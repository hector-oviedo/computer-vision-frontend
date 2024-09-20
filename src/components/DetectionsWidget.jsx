import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import GaugeWidget from './GaugeWidget';
import DetectionsList from './DetectionsList';
import DetectionPopup from './DetectionPopup';

const DetectionsWidget = ({ models, totalFrames }) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [selectedDetection, setSelectedDetection] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Access the config from Redux store
  const config = useSelector((state) => state.config.config);

  const handleSliderChange = (event) => {
    setCurrentFrame(Number(event.target.value));
  };

  const handleBoxClick = (model, detection) => {
    if (!config || !config.rawFramesPath) {
      console.error('Configuration is missing rawFramesPath.');
      return;
    }

    // Construct the raw frame image URL
    const rawFrameUrl = `${config.rawFramesPath}/frame_${String(currentFrame).padStart(4, '0')}.png`;

    setSelectedDetection({
      imageUrl: rawFrameUrl,
      box: detection.box,
    });
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedDetection(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow mt-8">
      <h2 className="text-center text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Detections in frame {currentFrame}
      </h2>
      
      {/* Slider */}
      <input
        type="range"
        min="0"
        max={totalFrames - 1}
        value={currentFrame}
        onChange={handleSliderChange}
        className="w-full"
      />
      
      <div className="flex flex-wrap mt-4">
        {models.map((model) => {
          const frameData = model.jsonData.frames[currentFrame];
          const totalDetections = frameData?.detections.length || 0;

          return (
            <div key={model.name} className="flex-1 min-w-[200px] mx-2 mb-4">
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
              <DetectionsList 
                detections={frameData?.detections || []} 
                onBoxClick={(detection) => handleBoxClick(model, detection)} 
              />
            </div>
          );
        })}
      </div>

      {/* Detection Popup */}
      {selectedDetection && (
        <DetectionPopup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          imageUrl={selectedDetection.imageUrl}
          box={selectedDetection.box}
        />
      )}
    </div>
  );
};

// PropTypes validation
DetectionsWidget.propTypes = {
  models: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      jsonData: PropTypes.shape({
        frames: PropTypes.arrayOf(
          PropTypes.shape({
            frame_number: PropTypes.number.isRequired,
            inference_time_ms: PropTypes.number.isRequired,
            total_time_ms: PropTypes.number.isRequired,
            cpu_usage: PropTypes.number.isRequired,
            cpu_ram_usage: PropTypes.number.isRequired,
            gpu_vram_usage: PropTypes.number.isRequired,
            gpu_vram_reserved: PropTypes.number.isRequired,
            detections: PropTypes.arrayOf(
              PropTypes.shape({
                label: PropTypes.string.isRequired,
                score: PropTypes.number.isRequired,
                box: PropTypes.array.isRequired, // [x1, y1, x2, y2]
              })
            ).isRequired,
          })
        ).isRequired,
      }).isRequired,
    })
  ).isRequired,
  totalFrames: PropTypes.number.isRequired,
};

export default DetectionsWidget;
