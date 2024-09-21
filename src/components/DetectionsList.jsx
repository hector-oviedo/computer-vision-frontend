// src/components/DetectionsList.jsx
import React from 'react';
import PropTypes from 'prop-types';
import DetectionItem from './DetectionItem';

const DetectionsList = ({ detections, onBoxClick }) => {
  if (detections.length === 0) {
    return <p className="text-center text-gray-600 dark:text-gray-400">No detections available.</p>;
  }

  return (
    <div className="max-h-52 overflow-y-auto">
      <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 dark:bg-gray-600 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Label
            </th>
            <th className="py-2 px-4 bg-gray-200 dark:bg-gray-600 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Score
            </th>
            <th className="py-2 px-4 bg-gray-200 dark:bg-gray-600"></th>
          </tr>
        </thead>
        <tbody>
          {detections.map((detection, index) => (
            <DetectionItem key={`${detection.label}-${index}`} detection={detection} onBoxClick={onBoxClick} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

DetectionsList.propTypes = {
  detections: PropTypes.arrayOf(
    PropTypes.shape({
      model_name:  PropTypes.string,
      label: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      box: PropTypes.array.isRequired, // [x1, y1, x2, y2]
    })
  ).isRequired,
  onBoxClick: PropTypes.func.isRequired,
};

export default DetectionsList;
