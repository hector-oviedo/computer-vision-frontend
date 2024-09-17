// src/components/GaugeWidget.jsx
import React, { useEffect, useRef } from 'react';

const GaugeWidget = ({ name, minValue, maxValue, actualValue, label, units }) => {
  const min = Number(minValue) || 0;
  const max = Number(maxValue) || 100;
  const value = Number(actualValue) || 0;
  const normalizedValue = Math.min(Math.max(value, min), max);

  // Calculate the percentage for the gauge
  const percentage = ((normalizedValue - min) / (max - min)) * 100;

  // Ref for the SVG circle to animate the stroke
  const circleRef = useRef(null);

  // Use effect to animate the gauge on mount
  useEffect(() => {
    const circle = circleRef.current;
    if (circle) {
      // Reset the strokeDasharray for animation
      circle.style.strokeDasharray = '0 314';
      // Trigger the animation after a short delay
      setTimeout(() => {
        circle.style.transition = 'stroke-dasharray 1s ease-out';
        circle.style.strokeDasharray = `${(percentage * 314) / 100} 314`;
      }, 100);
    }
  }, [percentage]);

  // Determine the color based on the value (green to red)
  const getColor = () => {
    const red = (percentage * 255) / 100;
    const green = 255 - red;
    return `rgb(${red}, ${green}, 0)`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow text-center">
      <h3 className="text-lg  text-center font-semibold mb-2 text-gray-800 dark:text-gray-200">
        {name}
      </h3>
      <div className="relative inline-block w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 120 120">
          {/* Background Circle */}
          <circle
            className="text-gray-300"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="50"
            cx="60"
            cy="60"
          />
          {/* Animated Value Circle */}
          <circle
            ref={circleRef}
            strokeWidth="10"
            stroke={getColor()}
            fill="transparent"
            r="50"
            cx="60"
            cy="60"
            strokeDasharray="0 314"
            transform="rotate(-90 60 60)"
            style={{ transition: 'stroke-dasharray 1s ease-out' }}
          />
        </svg>
        {/* Display Actual Value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {normalizedValue}
          </span>
          {units && (
            <span className="text-sm text-gray-600 dark:text-gray-400">{units}</span>
          )}
        </div>
      </div>
      {/* Display Min and Max Values */}
      <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
        <span>Min: {min}</span>
        <span>Max: {max}</span>
      </div>
      {/* Label */}
      {label && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{label}</p>
      )}
    </div>
  );
};

export default GaugeWidget;
