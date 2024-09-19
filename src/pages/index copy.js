// src/pages/index.js
import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import FramesSummary from '../components/FramesSummary';
import ModelsList from '../components/ModelsList';
import GaugesSection from '@/components/GaugesSection';
import ChartComponent from '../components/ChartComponent';
import FrameComparisonSlider from '../components/FrameComparisonSlider';
import DetectionsWidget from '../components/DetectionsWidget';
import ConfigLoader from '../components/ConfigLoader';
import getImageUrl from '../utils/getImageUrl';

const Home = () => {
  const models = useSelector((state) => state.config.models);

  // Determine total frames from the first model (assuming all models have the same total_frames)
  const totalFrames = models.length > 0 ? models[0].jsonData?.total_frames || 0 : 0;

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Configuration Loader */}
      <ConfigLoader>
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

          {/* Frames Compersion Section */}
          <section className="mt-8">
            <FrameComparisonSlider
              models={models || []}
              totalFrames={totalFrames || 0}
              getImageUrl={(model, frameIndex) =>
                getImageUrl(model, frameIndex, {
                  modelsInferenceFramesPath: '/output/frames/',
                })
              }
              units="" // Add units if applicable
            />
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
        </ConfigLoader>
    </div>
  );
};

export default Home;