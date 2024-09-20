// src/components/DetectionItem.jsx
import React from 'react';
import PropTypes from 'prop-types';

const DetectionItem = ({ detection, onBoxClick }) => {
  const { label, score, box } = detection;

  // Score color: red for low score, yellow for medium, green for high
  const scoreColor =
    score >= 0.7 ? 'text-green-600' : score >= 0.4 ? 'text-yellow-500' : 'text-red-500';

  const handleClick = () => {
    onBoxClick(detection);
  };

  return (
    <tr>
      <td className="text-gray-700 dark:text-gray-300 py-2 px-4">{label}</td>
      <td className={`font-semibold ${scoreColor} py-2 px-4`}>{score.toFixed(2)}</td>
      <td className="py-2 px-4">
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          aria-label={`Show box for detection ${label}`}
        >
          Box
        </button>
      </td>
    </tr>
  );
};

DetectionItem.propTypes = {
  detection: PropTypes.shape({
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    box: PropTypes.array.isRequired, // [x1, y1, x2, y2]
  }).isRequired,
  onBoxClick: PropTypes.func.isRequired,
};

export default DetectionItem;
