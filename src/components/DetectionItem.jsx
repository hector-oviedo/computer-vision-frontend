// src/components/DetectionItem.jsx
import React from 'react';
import PropTypes from 'prop-types';

const DetectionItem = ({ detection }) => {
  const { label, score, box } = detection;

  // Score color: red for low score, green for high score
  const scoreColor = score >= 0.7 ? 'text-green-600' : score >= 0.4 ? 'text-yellow-500' : 'text-red-500';

  return (
    <tr>
      <td className="text-gray-700 dark:text-gray-300">{label}</td>
      <td className={`font-semibold ${scoreColor}`}>{score.toFixed(2)}</td>
      <td>
        <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
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
    box: PropTypes.array.isRequired,
  }).isRequired,
};

export default DetectionItem;
