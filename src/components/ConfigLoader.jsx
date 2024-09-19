// src/components/ConfigLoader.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setConfig, setModels } from '../slices/configSlice'; // Ensure correct import paths

const ConfigLoader = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to load configuration and models
    const loadConfigAndModels = async () => {
      try {
        // Fetch config.json
        const configResponse = await fetch('/config.json');
        if (!configResponse.ok) {
          throw new Error('Failed to load configuration.');
        }
        const config = await configResponse.json();

        // Validate config structure
        const { modelsOutputs, models } = config;
        if (!modelsOutputs || !Array.isArray(models)) {
          throw new Error('Invalid configuration format.');
        }

        // Dispatch config to Redux store
        dispatch(setConfig(config));

        // Fetch each model's JSON data
        const modelPromises = models.map(async (modelName) => {
          const modelResponse = await fetch(`${modelsOutputs}/${modelName}.json`);
          if (!modelResponse.ok) {
            throw new Error(`Failed to load model file: ${modelName}.json`);
          }
          const modelData = await modelResponse.json();
          return {
            name: modelName,
            jsonData: modelData,
            selected: false,
          };
        });

        const modelsData = await Promise.all(modelPromises);

        // Dispatch models to Redux store
        dispatch(setModels(modelsData));

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadConfigAndModels();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-700 dark:text-gray-300">Loading configuration...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  // Render children if configuration and models are loaded successfully
  return <>{children}</>;
};

export default ConfigLoader;
