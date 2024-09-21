// src/components/DetectionPopup.jsx
import React from 'react';
import PropTypes from 'prop-types';

const DetectionPopup = ({ isOpen, onClose, imageUrl, box, label, score, model_name }) => {
  if (!isOpen) return null;

  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = React.useState(true); // State to manage overlay visibility
  const imageRef = React.useRef(null);
  const [imageDimensions, setImageDimensions] = React.useState({ width: 0, height: 0 });

  const handleImageLoad = () => {
    if (imageRef.current) {
      setImageDimensions({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight,
      });
      setImageLoaded(true);
    }
  };

  // Box coordinates
  const [x1, y1, x2, y2] = box;

  // Calculate overlay styles based on image dimensions
  const overlayStyle = imageLoaded
    ? {
        left: `${(x1 / imageDimensions.width) * 100}%`,
        top: `${(y1 / imageDimensions.height) * 100}%`,
        width: `${((x2 - x1) / imageDimensions.width) * 100}%`,
        height: `${((y2 - y1) / imageDimensions.height) * 100}%`,
      }
    : {};

  // Function to determine score color
  const getScoreColor = (score) => {
    if (score >= 0.7) return 'text-green-600';
    if (score >= 0.4) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Handle toggle overlay button click
  const handleToggleOverlay = () => {
    setIsOverlayVisible((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full shadow-lg flex flex-col md:flex-row">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white text-3xl focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        {/* Left Section: Image with Overlay */}
        <div className="md:w-2/3 relative popup-image-container">
          <img
            src={imageUrl}
            alt="Frame"
            ref={imageRef}
            onLoad={handleImageLoad}
            className="max-w-full h-auto rounded shadow-md"
          />
          {imageLoaded && isOverlayVisible && (
            <div
              className="absolute transition-opacity duration-300 popup-image"
              style={overlayStyle}
            ></div>
          )}
        </div>

        {/* Right Sidebar: Label, Score, Toggle Button */}
        <div className="md:w-1/3 pr-4 mb-4 md:mb-0 padding-panel">
          {/* Model Name */}
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">{model_name}</h3>
          {/* Label Name */}
          <h4 className="text-2xl text-gray-800 dark:text-gray-100 mb-2">{'<'+label+'>'}</h4>

          {/* Score */}
          <p className={`text-lg font-semibold ${getScoreColor(score)} mb-4`}>
            Confidence: {(score * 100).toFixed(2)}%
          </p>

          {/* Toggle Overlay Button */}
          <button
            onClick={handleToggleOverlay}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200"
          >
            {isOverlayVisible ? 'Hide Overlay' : 'Show Overlay'}
          </button>
        </div>
      </div>
    </div>
  );
};

DetectionPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  model_name: PropTypes.number.model_name,
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  box: PropTypes.arrayOf(PropTypes.number).isRequired, // [x1, y1, x2, y2]
};

export default DetectionPopup;
