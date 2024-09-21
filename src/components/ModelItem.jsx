// src/components/ModelItem.jsx
import React from 'react';
import PropTypes from 'prop-types';

const ModelItem = ({ model }) => {
  return (
    <article className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">
          {model.name}
        </h4>
        <span className='px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800'>
        {model.jsonData.model_identifier}
        </span>
      </div>
      
      <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 flex flex-wrap gap-2">
        {/* Parameters */}
        <small className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
          <strong>Parameters:</strong> {model.jsonData.parameters}
        </small>
        
        {/* Official Site */}
        <small className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
          <a
            href={model.jsonData.official_site}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
          <strong>Official Site</strong>
          </a>
        </small>
      </div>
    </article>
  );
};

ModelItem.propTypes = {
  model: PropTypes.shape({
    name: PropTypes.string.isRequired,
    device: PropTypes.string
  }).isRequired,
};

export default ModelItem;
