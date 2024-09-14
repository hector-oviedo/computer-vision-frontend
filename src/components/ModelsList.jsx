// src/components/ModelsList.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import ModelItem from './ModelItem';

const ModelsList = () => {
  const models = useSelector((state) => state.config.models);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
      <h3 className="text-lg font-semibold mb-4">Models</h3>
      {models && models.length > 0 ? (
        <div className="space-y-4">
          {models.map((model, index) => (
            <ModelItem key={index} model={model} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No models loaded.</p>
      )}
    </div>
  );
};

export default ModelsList;
