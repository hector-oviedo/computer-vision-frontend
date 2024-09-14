// src/components/ModelItemLite.jsx
import React from 'react';

const ModelItemLite = ({ model, onSelectToggle, onRemove }) => {
  return (
    <tr className="border-b dark:border-gray-700">
      <td className="py-2 px-4">
        <span className="text-gray-800 dark:text-gray-200">{model.name}</span>
      </td>
      <td className="py-2 px-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {model.selected ? 'Selected' : 'Not Selected'}
        </span>
      </td>
      <td className="py-2 px-4">
        <button
          onClick={onSelectToggle}
          className={`text-xs px-2 py-1 rounded-full ${
            model.selected
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-200'
              : 'bg-blue-100 text-blue-800 dark:bg-blue-200'
          }`}
        >
          {model.selected ? 'Unselect' : 'Select'}
        </button>
      </td>
      <td className="py-2 px-4">
        <button
          onClick={onRemove}
          className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full dark:bg-red-200"
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default ModelItemLite;
