// src/components/SetupForm.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ModelManager from './ModelManager';
import ModelItemLite from './ModelItemLite';

const SetupForm = ({ isOpen, onClose, onSave }) => {
  const framesFromStore = useSelector((state) => state.config.frames);
  const modelsFromStore = useSelector((state) => state.config.models);
  const [framePaths, setFramePaths] = useState([]);
  const [models, setModels] = useState([]);

  useEffect(() => {
    if (framesFromStore && framesFromStore.length > 0) {
      setFramePaths(framesFromStore);
    }
  }, [framesFromStore]);

  useEffect(() => {
    if (modelsFromStore) {
      setModels(modelsFromStore);
    }
  }, [modelsFromStore]);

  const handleFrameFilesChange = (event) => {
    const files = Array.from(event.target.files);
    const paths = files.map((file) => file.webkitRelativePath);
    setFramePaths(paths);
  };

  const handleApply = () => {
    const configData = {
      frames: framePaths,
      models: models,
    };
    onSave(configData);
  };

  const handleClose = () => {
    onClose();
  };

  // Open Model Manager
  const [isModelManagerOpen, setIsModelManagerOpen] = useState(false);
  const handleModelManagerOpen = () => setIsModelManagerOpen(true);
  const handleModelManagerClose = () => setIsModelManagerOpen(false);

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

        {/* Frames Selection */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Frames (PNG Files)</h3>
          <input
            type="file"
            accept="image/png"
            multiple
            webkitdirectory=""
            onChange={handleFrameFilesChange}
            className="mt-2"
          />
          {framePaths && framePaths.length > 0 ? (
            <p>{framePaths.length} frame(s) selected.</p>
          ) : (
            <p>No frames selected.</p>
          )}
        </div>

        {/* Models Management */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold mb-2">Models</h3>
            <button
              onClick={handleModelManagerOpen}
              className="text-blue-600 hover:text-blue-800"
            >
              Manage Models
            </button>
          </div>
          {models.length > 0 ? (
            <div className="overflow-auto max-h-48">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {models.map((model, index) => (
                    <tr key={index} className="border-b dark:border-gray-700">
                      <td className="py-2 px-4">
                        <span className="text-gray-800 dark:text-gray-200">
                          {model.name}
                        </span>
                      </td>
                      <td className="py-2 px-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {model.selected ? 'Selected' : 'Not Selected'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No models added.</p>
          )}
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Apply
        </button>

        {/* Model Manager Popup */}
        {isModelManagerOpen && (
          <ModelManager
            isOpen={isModelManagerOpen}
            onClose={handleModelManagerClose}
            models={models}
            setModels={setModels}
          />
        )}
      </section>
    </div>
  );
};

export default SetupForm;
