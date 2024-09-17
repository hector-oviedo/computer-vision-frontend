// src/pages/index.js
import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import FramesSummary from '../components/FramesSummary';
import ModelsList from '../components/ModelsList';
import GaugesSection from '@/components/GaugesSection';
import ChartComponent from '../components/ChartComponent';
import FrameComparisonSlider from '../components/FrameComparisonSlider';

const Home = () => {
  const models = useSelector((state) => state.config.models);

  // Determine total frames (assuming all models have the same total_frames)
  const totalFrames = models.length > 0 ? Math.max(...models.map(model => model.jsonData?.frames?.length || 0)) : 0;

  // Prepare gauges data
  const metricName = 'total_inference_time'; // This can be dynamic
  const metricLabel = 'Total Inference Time';
  const units = 'seconds';

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

  // Prepare data for the chart
  const chartTitle = 'Inference Time per Frame';
  const xLabel = 'Frame Number';
  const yLabel = 'Inference Time (seconds)';

  // Define colors for the datasets
  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

  // Prepare datasets and labels
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

    const data = framesData.map((frame) => frame.inference_time);

    chartDatasets.push({
      label: model.name,
      data,
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length],
    });
  });

  // Prepare image URL function
  const getImageUrl = (model, frameIndex) => {
    // Adjust this according to your actual image storage path

    // Remove '_results.json' from model.name and ensure frame index has leading zeros
    return `/frames/${model.name.replace('_results.json', '')}/frame_${String(frameIndex).padStart(4, '0')}.png`;

  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-6 bg-gray-100 dark:bg-gray-900">
        {/* Configuration Summary Section */}
        <section>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Frames Summary */}
            <FramesSummary framesCount={totalFrames || 0} />

            {/* Models List */}
            <ModelsList />
          </div>
        </section>

        {/* Gauge Widgets Section */}
        <section className="mt-8">
          <GaugesSection title={metricLabel} gaugesData={gaugesData} />
        </section>

        {/* Chart Section */}
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
              No data available for the chart.
            </p>
          )}
        </section>

        {/* Chart Section */}
        <section className="mt-8">
          <FrameComparisonSlider
            models={models || []}
            totalFrames={totalFrames || 0}
            getImageUrl={getImageUrl}
            units="" // Add units if applicable
          />
        </section>
      </main>
    </div>
  );
};

export default Home;