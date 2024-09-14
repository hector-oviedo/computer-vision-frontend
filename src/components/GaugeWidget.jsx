// src/components/GaugeWidget.jsx
import React, { useContext } from 'react';
import { ModelDataContext } from '../contexts/ModelDataContext';

const GaugeWidget = ({ modelName, metric, minValue, maxValue }) => {
  const { modelDataMap } = useContext(ModelDataContext);

  // Access the model's data
  const modelData = modelDataMap[modelName];

  // Ensure modelData is available
  if (!modelData) {
    return null;
  }

  // Get the metric value from the model's data
  const metricValue = modelData[metric];

  // Calculate the percentage for the gauge
  const percentage = ((metricValue - minValue) / (maxValue - minValue)) * 100;

  // Ensure percentage is within 0-100%
  const normalizedPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow text-center">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        {modelName}
      </h3>
      <div className="relative inline-block w-24 h-24">
        <svg className="w-full h-full">
          <circle
            className="text-gray-300"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="50"
            cx="60"
            cy="60"
          />
          <circle
            className="text-blue-600"
            strokeWidth="8"
            strokeDasharray={`${normalizedPercentage}, 100`}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="50"
            cx="60"
            cy="60"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {metricValue.toFixed(1)}
          </span>
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {metric.replace(/_/g, ' ').toUpperCase()}
      </p>
    </div>
  );
};

export default GaugeWidget;