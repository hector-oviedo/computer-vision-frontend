// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FiSettings, FiUpload } from 'react-icons/fi';
import dynamic from 'next/dynamic';
import SetupForm from './SetupForm';
import { setFrames, setModels, loadConfigFromLocalStorage } from '../slices/configSlice';

// Dynamically import InternalConfig with SSR disabled
const InternalConfig = dynamic(() => import('./InternalConfig'), { ssr: false });

const Header = () => {
  const dispatch = useDispatch();
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isSetupOpen, setIsSetupOpen] = useState(false);

  const handleConfigOpen = () => setIsConfigOpen(true);
  const handleConfigClose = () => setIsConfigOpen(false);
  const handleSetupOpen = () => setIsSetupOpen(true);
  const handleSetupClose = () => setIsSetupOpen(false);

  const handleSaveSetup = (configData) => {
    const { frames, models } = configData;

    dispatch(setFrames(frames || []));
    dispatch(setModels(models || []));

    handleSetupClose();
  };

  useEffect(() => {
    //dispatch(loadConfigFromLocalStorage());
  }, [dispatch]);

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300 ease-in-out">
      {/* Internal Configuration Icon on the Left */}
      <button
        onClick={handleConfigOpen}
        aria-label="Open Internal Config"
        className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
      >
        <FiSettings className="w-6 h-6" />
      </button>

      {/* Title and Subtitle in the Center */}
      <div className="text-center">
        <h1 className="font-bold">Computer Vision Frontend</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Compare and Analyze Models
        </p>
      </div>

      {/* Setup Button on the Right */}
      <button
        onClick={handleSetupOpen}
        aria-label="Open Setup Form"
        className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
      >
        <FiUpload className="w-6 h-6" />
      </button>

      {/* InternalConfig Popup */}
      <InternalConfig isOpen={isConfigOpen} onClose={handleConfigClose} />

      {/* SetupForm Popup */}
      <SetupForm
        isOpen={isSetupOpen}
        onClose={handleSetupClose}
        onSave={handleSaveSetup}
      />
    </header>
  );
};

export default Header;
