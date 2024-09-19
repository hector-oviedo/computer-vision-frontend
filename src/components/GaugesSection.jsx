// src/components/GaugesSection.jsx
import React from 'react';
import GaugeWidget from './GaugeWidget';

const GaugesSection = ({ title, gaugesData }) => {
  if (!gaugesData || gaugesData.length === 0) {
    return null;
  }

  // Determine the number of columns based on the number of gauges
  const numColumns = gaugesData.length;

  return (
    <section className="mt-8">
      {title && (
        <h2 className="text-center text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          {title}
        </h2>
      )}
      <div
        className="grid gap-6"
        style={{ gridTemplateColumns: `repeat(${numColumns}, minmax(0, 1fr))` }}
      >
        {gaugesData.map((gauge, index) => (
          <GaugeWidget
            key={index}
            name={gauge.name}
            minValue={gauge.minValue}
            maxValue={gauge.maxValue}
            actualValue={gauge.actualValue}
            label={gauge.label}
            units={gauge.units}
          />
        ))}
      </div>
    </section>
  );
};

export default GaugesSection;
