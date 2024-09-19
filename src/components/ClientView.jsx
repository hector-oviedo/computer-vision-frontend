// src/components/ClientView.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import FramesSummary from './FramesSummary';
import ModelsList from './ModelsList';
import GaugesSection from './GaugesSection';
import ChartComponent from './ChartComponent';
import FrameComparisonSlider from './FrameComparisonSlider';
import DetectionsWidget from './DetectionsWidget';
import getImageUrl from '../utils/getImageUrl';

const ClientView = () => {
  const config = useSelector((state) => state.config.config);
  const models = useSelector((state) => state.config.models);

  if (!config || models.length === 0) {
    return (
      <p className="text-center text-gray-600 dark:text-gray-400">
        No models or configuration available.
      </p>
    );
  }

  const { rawFramesPath, modelsOutputs, modelsInferenceFramesPath } = config;
  const totalFrames = models.length > 0 ? models[0].jsonData?.total_frames || 0 : 0;


    // Prepare gauges data
    const metricName = 'total_inference_time_ms'; // This can be dynamic
    const metricLabel = 'Total Inference Time';
    const units = 'milliseconds';
  
    // Extract the metric values from models
    const metricValues = models.map(
      (model) => model.jsonData?.[metricName] || 0
    );
    // Define the min and max values for the gauges
    const minValue = 0;
    const maxValue = Math.max(...metricValues, 100); // Ensure maxValue is at least 100

    // Prepare data for gauges
    const gaugesData = models.map((model) => {
      const name = model.name;
      const actualValue = model.jsonData?.[metricName] || 0;
  
      return {
        name,
        minValue,
        maxValue,
        actualValue,
        label: metricLabel,
        units,
      };
    });

  // Prepare data for the inference time chart
  const chartTitle = 'Inference Time per Frame';
  const xLabel = 'Frame Number';
  const yLabel = 'Inference Time (seconds)';

  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

  let chartDatasets = [];
  let labels = [];

  models.forEach((model, index) => {
    const { jsonData } = model;
    if (!jsonData || !jsonData.frames || jsonData.frames.length === 0) {
      return; // Skip if jsonData or frames are not available
    }

    const framesData = jsonData.frames;

    // Only set labels once using the frame numbers
    if (labels.length === 0) {
      labels = framesData.map((frame) => frame.frame_number + 1); // Adding 1 if frames start from 0
    }

    const data = framesData.map((frame) => frame.inference_time_ms);

    chartDatasets.push({
      label: model.name,
      data,
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length],
    });
  });

  // Prepare data for the detections chart
  const detectionsChartTitle = 'Total Detections per Frame';
  const detectionsXLabel = 'Frame Number';
  const detectionsYLabel = 'Total Detections';

  let detectionsChartDatasets = [];

  models.forEach((model, index) => {
    const { jsonData } = model;
    if (!jsonData || !jsonData.frames || jsonData.frames.length === 0) {
      return; // Skip if jsonData or frames are not available
    }

    const framesData = jsonData.frames;

    const detectionsData = framesData.map((frame) => frame.detections.length);

    detectionsChartDatasets.push({
      label: model.name,
      data: detectionsData,
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length],
    });
  });

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-grow p-6 bg-gray-100 dark:bg-gray-900">
        {/* Configuration Summary Section */}
        <section>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Frames Summary */}
            <FramesSummary framesCount={totalFrames || []} />

            {/* Models List */}
            <ModelsList />
          </div>
        </section>

        {/* Gauge Widgets Section */}
        <section className="mt-8">
          {/* Gauge Widgets Section */}
          <section className="mt-8">
            <GaugesSection title={metricLabel} gaugesData={gaugesData} />
          </section>
        </section>

        {/* Inference Time Chart Section */}
        <section className="mt-8">
          {chartDatasets.length > 0 ? (
            <ChartComponent
              title={chartTitle}
              datasets={chartDatasets}
              labels={labels}
              xLabel={xLabel}
              yLabel={yLabel}
            />
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">
              No data available for the inference time chart.
            </p>
          )}
        </section>

        {/* Detections Chart Section */}
        <section className="mt-8">
          {detectionsChartDatasets.length > 0 ? (
            <ChartComponent
              title={detectionsChartTitle}
              datasets={detectionsChartDatasets}
              labels={labels}
              xLabel={detectionsXLabel}
              yLabel={detectionsYLabel}
            />
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">
              No data available for the detections chart.
            </p>
          )}
        </section>

        {/* Frame Comparison Slider Section */}
        <section className="mt-8">
          {models.length > 0 && totalFrames > 0 ? (
            <FrameComparisonSlider
              models={models || []}
              totalFrames={totalFrames || 0}
              getImageUrl={(model, frameIndex) =>
                getImageUrl(model, frameIndex, config)
              }
              units="" // Add units if applicable
            />
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">
              No models or frames available for comparison.
            </p>
          )}
        </section>

        {/* Detections Widget Section */}
        <section className="mt-8">
          {models.length > 0 && totalFrames > 0 ? (
            <DetectionsWidget models={models} totalFrames={totalFrames} />
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">
              No models or frames available for detection comparison.
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default ClientView;
