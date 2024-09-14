// src/components/ModelManager.jsx
import React from 'react';
import AddModelPopup from './AddModelPopup';
import ModelItemLite from './ModelItemLite';

const ModelManager = ({ isOpen, onClose, models, setModels }) => {
  const [isAddModelOpen, setIsAddModelOpen] = React.useState(false);

  const handleAddModelOpen = () => setIsAddModelOpen(true);
  const handleAddModelClose = () => setIsAddModelOpen(false);

  const handleAddModel = (newModel) => {
    setModels([...models, newModel]);
    handleAddModelClose();
  };

  const handleRemoveModel = (index) => {
    const updatedModels = models.filter((_, i) => i !== index);
    setModels(updatedModels);
  };

  const toggleModelSelected = (index) => {
    const updatedModels = models.map((model, i) =>
      i === index ? { ...model, selected: !model.selected } : model
    );
    setModels(updatedModels);
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
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="font-bold mb-4 text-center">Manage Models</h2>

        {/* List of Models */}
        {models.length > 0 ? (
          <div className="overflow-auto max-h-64 mb-4">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model, index) => (
                  <ModelItemLite
                    key={index}
                    model={model}
                    onSelectToggle={() => toggleModelSelected(index)}
                    onRemove={() => handleRemoveModel(index)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mb-4 text-gray-500 dark:text-gray-400">No models added yet.</p>
        )}

        {/* Add Model Button */}
        <button
          onClick={handleAddModelOpen}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Model
        </button>

        {/* Add Model Popup */}
        {isAddModelOpen && (
          <AddModelPopup
            isOpen={isAddModelOpen}
            onClose={handleAddModelClose}
            onAddModel={handleAddModel}
          />
        )}
      </section>
    </div>
  );
};

export default ModelManager;
