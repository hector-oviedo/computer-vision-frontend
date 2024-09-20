import React from 'react';
import PropTypes from 'prop-types';

const DetectionPopup = ({ isOpen, onClose, imageUrl, box }) => {
  if (!isOpen) return null;

  const [imageLoaded, setImageLoaded] = React.useState(false);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg p-4 max-w-3xl w-full">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        {/* Image container */}
        <div className="relative popup-image-container">
          <img
            src={imageUrl}
            alt="Frame"
            ref={imageRef}
            onLoad={handleImageLoad}
            className="max-w-full h-auto rounded"
          />
          {imageLoaded && (
            <div
              className="absolute border-2 border-red-500 popup-image"
              style={overlayStyle}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

DetectionPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  box: PropTypes.arrayOf(PropTypes.number).isRequired, // [x1, y1, x2, y2]
};

export default DetectionPopup;
