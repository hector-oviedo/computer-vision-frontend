// src/components/GaugeWidgetsSection.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import GaugeWidget from './GaugeWidget';

const GaugeWidgetsSection = () => {
  const models = useSelector((state) => state.config.models);

  // Only proceed if models are loaded
  if (!models || models.length === 0) {
    return <p>No models loaded.</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {models.map((model, index) => (
        <GaugeWidget
          key={index}
          modelName={model.name}
          metric="total_inference_time"
          minValue={0}
          maxValue={500} // Adjust based on expected range
        />
      ))}
    </div>
  );
};

export default GaugeWidgetsSection;
