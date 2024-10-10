// src/components/FalseDetectionsWidget.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types';

const FalseDetectionsWidget = ({ models, selectedLabels, frameRange }) => {
  const [framesWithFalseDetections, setFramesWithFalseDetections] = useState([]);
  const [falseDetectionsByFrame, setFalseDetectionsByFrame] = useState({});
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [falseDetectionsSummary, setFalseDetectionsSummary] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Sorting state for the summary table
  const [sortColumn, setSortColumn] = useState('label');
  const [sortDirection, setSortDirection] = useState('asc');

  // Function to analyze false detections when the button is clicked
  const analyzeFalseDetections = () => {
    if (selectedLabels.length === 0) {
      alert('Please select labels to analyze false detections.');
      return;
    }

    setIsProcessing(true);

    const [startFrame, endFrame] = frameRange;

    // Temporary data structures
    const framesList = [];
    const framesSet = new Set();
    const detectionsByFrame = {};
    const summaryByLabelModel = {};

    // Iterate over each model
    models.forEach((model) => {
      const modelName = model.jsonData.model_identifier;
      const framesData = model.jsonData?.frames || [];

      // Filter frames within the selected range
      const framesInRange = framesData.filter(
        (frame) => frame.frame_number >= startFrame && frame.frame_number <= endFrame
      );

      framesInRange.forEach((frame) => {
        const frameNumber = frame.frame_number;
        const detections = frame.detections || [];

        detections.forEach((detection) => {
          const label = detection.label;

          // If the detection's label is not in selectedLabels, it's a false detection
          if (!selectedLabels.includes(label)) {
            const uniqueKey = `${label}-${modelName}-${frameNumber}`;

            // Update frames list and set
            if (!framesSet.has(uniqueKey)) {
              framesSet.add(uniqueKey);

              framesList.push({
                uniqueKey,
                label,
                modelName,
                frameNumber,
                detectionsCount: 1,
              });
            } else {
              // Increment detectionsCount
              const frameItem = framesList.find((item) => item.uniqueKey === uniqueKey);
              if (frameItem) {
                frameItem.detectionsCount += 1;
              }
            }

            // Update detectionsByFrame
            if (!detectionsByFrame[uniqueKey]) {
              detectionsByFrame[uniqueKey] = [];
            }

            detectionsByFrame[uniqueKey].push({
              label,
              score: detection.score,
            });

            // Update summaryByLabelModel
            const summaryKey = `${label}-${modelName}`;
            if (!summaryByLabelModel[summaryKey]) {
              summaryByLabelModel[summaryKey] = {
                label,
                modelName,
                frames: new Set(),
                totalCount: 0,
              };
            }
            summaryByLabelModel[summaryKey].frames.add(frameNumber);
            summaryByLabelModel[summaryKey].totalCount += 1;
          }
        });
      });
    });

    // Sort framesList by frameNumber
    framesList.sort((a, b) => a.frameNumber - b.frameNumber);

    // Convert frames Sets to arrays in summary
    Object.keys(summaryByLabelModel).forEach((key) => {
      summaryByLabelModel[key].frames = Array.from(summaryByLabelModel[key].frames).sort(
        (a, b) => a - b
      );
    });

    // Update the state
    setFramesWithFalseDetections(framesList);
    setFalseDetectionsByFrame(detectionsByFrame);
    setIsProcessing(false);
    setFalseDetectionsSummary(summaryByLabelModel);
  };

  // Handle selecting a frame from the frames list
  const handleSelectFrame = (uniqueKey) => {
    setSelectedFrame(uniqueKey);
  };

  // Handle sorting when a table header is clicked
  const handleSort = (column) => {
    if (sortColumn === column) {
      // Toggle sort direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort column and default to ascending
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Get sorted summary data
  const getSortedSummary = () => {
    const summaryArray = Object.values(falseDetectionsSummary);

    summaryArray.sort((a, b) => {
      let compareA, compareB;

      if (sortColumn === 'label') {
        compareA = a.label.toLowerCase();
        compareB = b.label.toLowerCase();
      } else if (sortColumn === 'modelName') {
        compareA = a.modelName.toLowerCase();
        compareB = b.modelName.toLowerCase();
      } else if (sortColumn === 'totalFrames') {
        compareA = a.frames.length;
        compareB = b.frames.length;
      } else {
        compareA = 0;
        compareB = 0;
      }

      if (compareA < compareB) return sortDirection === 'asc' ? -1 : 1;
      if (compareA > compareB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return summaryArray;
  };

  return (
    <div className="false-detections-widget mt-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        False Detections Analysis
      </h3>
      {/* Button to trigger analysis */}
      <button
        onClick={analyzeFalseDetections}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
      >
        Analyze False Detections
      </button>

      {/* Show loading indicator if processing */}
      {isProcessing && (
        <p className="mt-4 text-gray-700 dark:text-gray-300">Analyzing data, please wait...</p>
      )}

      {/* Only display results if we have data */}
      {!isProcessing && framesWithFalseDetections.length > 0 && (
        <>
          <div className="flex flex-col md:flex-row gap-6 mt-6">
            {/* Frames with False Detections (Left Side) */}
            <div className="w-full md:w-1/2">
              <h4 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Frames with False Detections
              </h4>
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg h-40 overflow-y-auto p-2">
                {framesWithFalseDetections.map((frameItem) => (
                  <div
                    key={frameItem.uniqueKey}
                    onClick={() => handleSelectFrame(frameItem.uniqueKey)}
                    className={`mb-1 px-2 py-1 cursor-pointer ${
                      selectedFrame === frameItem.uniqueKey
                        ? 'bg-blue-200 dark:bg-blue-700'
                        : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {frameItem.label} - {frameItem.modelName} - Frame {frameItem.frameNumber} - Detections{' '}
                      {frameItem.detectionsCount}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Click a frame to view details
              </p>
            </div>

            {/* Selected Detections (Right Side) */}
            <div className="w-full md:w-1/2">
              <h4 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                {selectedFrame !== null ? `False Detections Details` : 'Select a Frame'}
              </h4>
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg h-40 overflow-y-auto p-2">
                {selectedFrame !== null && falseDetectionsByFrame[selectedFrame] ? (
                  falseDetectionsByFrame[selectedFrame].map((item, index) => (
                    <div key={index} className="mb-2">
                      <p className="text-gray-700 dark:text-gray-300">
                        {item.label} - {item.score}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    {selectedFrame !== null
                      ? 'No false detections in this frame.'
                      : 'Select a frame to view its false detections.'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* False Detections Summary */}
          <div className="mt-6 overflow-x-auto">
            <h4 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
              False Detections Summary
            </h4>
            {Object.keys(falseDetectionsSummary).length > 0 ? (
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th
                      className="px-4 py-2 text-left text-gray-700 dark:text-gray-300 cursor-pointer"
                      onClick={() => handleSort('label')}
                    >
                      Label {sortColumn === 'label' && (sortDirection === 'asc' ? '▲' : '▼')}
                    </th>
                    <th
                      className="px-4 py-2 text-left text-gray-700 dark:text-gray-300 cursor-pointer"
                      onClick={() => handleSort('modelName')}
                    >
                      Model Name {sortColumn === 'modelName' && (sortDirection === 'asc' ? '▲' : '▼')}
                    </th>
                    <th
                      className="px-4 py-2 text-left text-gray-700 dark:text-gray-300 cursor-pointer"
                      onClick={() => handleSort('totalFrames')}
                    >
                      Total Frames {sortColumn === 'totalFrames' && (sortDirection === 'asc' ? '▲' : '▼')}
                    </th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                      Frames Involved
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getSortedSummary().map((data, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{data.label}</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300 text-small">{data.modelName}</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{data.frames.length}</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300 text-small">
                        {data.frames.join(', ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No false detections found.</p>
            )}
          </div>
        </>
      )}

      {/* Message if no false detections found */}
      {!isProcessing && framesWithFalseDetections.length === 0 && (
        <p className="mt-4 text-gray-500 dark:text-gray-400">
          No false detections found. Adjust your selected labels or frame range and try again.
        </p>
      )}
    </div>
  );
};

FalseDetectionsWidget.propTypes = {
  models: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      jsonData: PropTypes.shape({
        frames: PropTypes.arrayOf(
          PropTypes.shape({
            frame_number: PropTypes.number.isRequired,
            detections: PropTypes.arrayOf(
              PropTypes.shape({
                label: PropTypes.string.isRequired,
                score: PropTypes.number.isRequired,
              })
            ),
          })
        ),
      }),
    })
  ).isRequired,
  selectedLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  frameRange: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default FalseDetectionsWidget;
