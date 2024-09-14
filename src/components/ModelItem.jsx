// src/components/ModelItem.jsx
import React from 'react';

const ModelItem = ({ model }) => {
  return (
    <article className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">
          {model.name}
        </h4>
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            model.selected
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {model.selected ? 'Selected' : 'Not Selected'}
        </span>
      </div>
      <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        <p>
          <strong>JSON Path:</strong> {model.jsonFilePath}
        </p>
        <p>
          <strong>Frames Folder:</strong> {model.framesFolderPath}
        </p>
      </div>
    </article>
  );
};

export default ModelItem;
