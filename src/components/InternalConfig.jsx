// src/components/InternalConfig.jsx
"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTextSize, toggleDarkMode } from '../slices/settingsSlice';

const InternalConfig = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { darkMode, textSize } = useSelector((state) => state.settings);

  // Local state to manage temporary settings before applying
  const [localDarkMode, setLocalDarkMode] = useState(darkMode);
  const [localTextSize, setLocalTextSize] = useState(textSize);

  // Apply changes to Redux store
  const handleApply = () => {
    if (localDarkMode !== darkMode) {
      dispatch(toggleDarkMode());
    }
    if (localTextSize !== textSize) {
      dispatch(setTextSize(localTextSize));
    }
    onClose();
  };

  // Close the popup
  const handleClose = () => {
    onClose();
  };

  // Always render the component, control visibility with CSS
  return (
    // Background overlay with fade-in effect
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out ${
        isOpen ? 'opacity-100 bg-black bg-opacity-50' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Popup container with scale-in animation */}
      <section
        className={`relative bg-white dark:bg-gray-800 rounded-lg p-6 transform transition-all duration-300 ease-in-out ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
          onClick={handleClose}
          aria-label="Close"
        >
          &times;
        </button>

        {/* Popup content */}
        <h2 className="font-bold mb-4">Internal Configuration</h2>

        {/* Dark Mode Toggle */}
        <div className="flex items-center mb-4">
          <label htmlFor="darkModeToggle" className="mr-2">
            Dark Mode
          </label>
          <button
            id="darkModeToggle"
            onClick={() => setLocalDarkMode(!localDarkMode)}
            className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ${
              localDarkMode ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                localDarkMode ? 'translate-x-6' : ''
              }`}
            ></div>
          </button>
        </div>

        {/* Text Size Options */}
        <div className="mb-4">
          <p className="mb-2">Text Size</p>
          <div className="flex space-x-4">
            {['small', 'medium', 'large'].map((size) => (
              <button
                key={size}
                onClick={() => setLocalTextSize(size)}
                className={`px-4 py-2 rounded ${
                  localTextSize === size
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Apply
        </button>
      </section>
    </div>
  );
};

export default InternalConfig;
