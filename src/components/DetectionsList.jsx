// src/components/DetectionsList.jsx
import React from 'react';
import PropTypes from 'prop-types';
import DetectionItem from './DetectionItem';

const DetectionsList = ({ detections }) => {
  return (
    <div className="h-64 overflow-y-auto bg-gray-100 dark:bg-gray-700 p-4 rounded">
      {detections.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left text-gray-700 dark:text-gray-300">Label</th>
              <th className="text-left text-gray-700 dark:text-gray-300">Score</th>
              <th className="text-left text-gray-700 dark:text-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {detections.map((detection, index) => (
              <DetectionItem key={index} detection={detection} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No detections found.</p>
      )}
    </div>
  );
};

DetectionsList.propTypes = {
  detections: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      box: PropTypes.array.isRequired,
    })
  ).isRequired,
};

export default DetectionsList;
