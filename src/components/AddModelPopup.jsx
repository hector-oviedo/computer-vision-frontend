// src/components/AddModelPopup.jsx
"use client";

import React, { useState, useContext } from 'react';
import { ModelDataContext } from '../contexts/ModelDataContext';

const AddModelPopup = ({ isOpen, onClose, onAddModel }) => {
  const [modelName, setModelName] = useState('');
  const [jsonFile, setJsonFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [framesFolderPath, setFramesFolderPath] = useState('');

  const { addModelData } = useContext(ModelDataContext);

  const handleJsonFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setJsonFile(file);
      setModelName(file.name);
  
      // Read the file content
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsedData = JSON.parse(e.target.result);
          setJsonData(parsedData);
          console.log('Parsed JSON Data:', parsedData); // For debugging
        } catch (error) {
          alert('Invalid JSON file. Please select a valid JSON file.');
          setJsonFile(null);
          setJsonData(null);
        }
      };
      reader.readAsText(file);
    }
  };  

  const handleFramesFolderChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const folderPath = files[0].webkitRelativePath.split('/')[0];
      setFramesFolderPath(folderPath);
    }
  };

  const handleAddModel = () => {
    if (jsonFile && jsonData && framesFolderPath) {
      const newModel = {
        name: modelName,
        jsonFileName: jsonFile.name,
        framesFolderPath,
        selected: false,
      };
      // Store jsonData in ModelDataContext
      addModelData(modelName, jsonData);
      onAddModel(newModel);
      onClose();
    } else {
      alert('Please select a JSON file and inference frames folder.');
    }
  };

  const handleClose = () => {
    onClose();
  };

  // Always render the component; control visibility with CSS
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out ${
        isOpen ? 'opacity-100 bg-black bg-opacity-50' : 'opacity-0 pointer-events-none'
      }`}
    >
      <section
        className={`relative bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg transform transition-all duration-300 ease-in-out ${
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
        <h2 className="font-bold mb-4 text-center">Add Model</h2>

        {/* JSON File Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">JSON File</label>
          <input
            type="file"
            accept=".json"
            onChange={handleJsonFileChange}
            className="mt-2"
          />
          {jsonFile && <p>Selected: {jsonFile.name}</p>}
        </div>

        {/* Frames Folder Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Inference Frames Folder</label>
          <input
            type="file"
            webkitdirectory=""
            directory=""
            multiple
            onChange={handleFramesFolderChange}
            className="mt-2"
          />
          {framesFolderPath && <p>Selected Folder: {framesFolderPath}</p>}
        </div>

        {/* Add Model Button */}
        <button
          onClick={handleAddModel}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Model
        </button>
      </section>
    </div>
  );
};

export default AddModelPopup;
