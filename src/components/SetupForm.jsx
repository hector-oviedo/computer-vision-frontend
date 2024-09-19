// src/components/SetupForm.jsx
import React from 'react';

const SetupForm = ({ isOpen, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out ${
        isOpen ? 'opacity-100 bg-black bg-opacity-50' : 'opacity-0 pointer-events-none'
      }`}
    >
      <section
        className={`relative bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl transform transition-all duration-300 ease-in-out ${
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
        <h2 className="font-bold mb-4 text-center">Setup Configuration</h2>
      </section>
    </div>
  );
};

export default SetupForm;
