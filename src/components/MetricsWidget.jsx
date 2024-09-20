// src/components/MetricsWidget.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GaugeWidget from './GaugeWidget';

const MetricsWidget = ({ models, totalFrames }) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  const handleSliderChange = (event) => {
    setCurrentFrame(Number(event.target.value));
  };

  // Define the metrics to display
  const metrics = [
    { key: 'inference_time_ms', label: 'Inference Time (ms)', maxValue: 1000 }, // Adjust maxValue as needed
    { key: 'total_time_ms', label: 'Total Time (ms)', maxValue: 1000 },
    { key: 'cpu_usage', label: 'CPU Usage (%)', maxValue: 100 },
    { key: 'cpu_ram_usage', label: 'CPU RAM Usage (MB)', maxValue: 32000 }, // Example maxValue
    { key: 'gpu_vram_usage', label: 'GPU VRAM Usage (MB)', maxValue: 16384 }, // Example maxValue
    { key: 'gpu_vram_reserved', label: 'GPU VRAM Reserved (MB)', maxValue: 16384 },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow mt-8">
      {/* Widget Title */}
      <h2 className="text-center text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Metrics in Frame {currentFrame}
      </h2>

      {/* Slider */}
      <input
        type="range"
        min="0"
        max={totalFrames - 1}
        value={currentFrame}
        onChange={handleSliderChange}
        className="w-full"
      />

      {/* Gauges Section */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => {
          const frameData = model.jsonData.frames[currentFrame];
          if (!frameData) return null;

          return (
            <div key={model.name} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="space-y-4">
                {metrics.map((metric) => {
                  const value = frameData[metric.key];
                  return (
                    <div key={`${model.name}-${metric.key}`}>
                      <h4 className="text-center text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        {metric.label}
                      </h4>
                      <GaugeWidget
                        modelName={model.name}
                        metric={metric.key}
                        metricName={metric.label}
                        minValue={0}
                        maxValue={metric.maxValue}
                        actualValue={value}
                        label={metric.label}
                        units={
                          metric.label.includes('Usage')
                            ? metric.label.includes('CPU')
                              ? 'MB'
                              : 'MB'
                            : ''
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// PropTypes validation
MetricsWidget.propTypes = {
  models: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      jsonData: PropTypes.shape({
        frames: PropTypes.arrayOf(
          PropTypes.shape({
            frame_number: PropTypes.number.isRequired,
            inference_time_ms: PropTypes.number.isRequired,
            total_time_ms: PropTypes.number.isRequired,
            cpu_usage: PropTypes.number.isRequired,
            cpu_ram_usage: PropTypes.number.isRequired,
            gpu_vram_usage: PropTypes.number.isRequired,
            gpu_vram_reserved: PropTypes.number.isRequired,
          })
        ).isRequired,
      }).isRequired,
    })
  ).isRequired,
  totalFrames: PropTypes.number.isRequired,
};

export default MetricsWidget;
