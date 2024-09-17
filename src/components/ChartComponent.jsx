// src/components/ChartComponent.jsx
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale, // x-axis scale
  LinearScale,   // y-axis scale
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({ title, datasets, labels, xLabel, yLabel }) => {
  const chartData = {
    labels: labels,
    datasets: datasets.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      borderColor: dataset.borderColor,
      backgroundColor: dataset.backgroundColor,
      fill: false,
      pointRadius: 0,    // Add this line to remove dots
      borderWidth: 1,    // Add this line to make the line thinner
    })),
  };

  // Detect theme from the document's data attribute or class
  const root = document.documentElement;
  const isDarkMode = root.classList.contains('dark') || root.getAttribute('data-theme') === 'dark';
  
  const [textColor, setTextColor] = useState('black');

  useEffect(() => {
    const root = document.documentElement;
  
    const updateTextColor = () => {
      const isDarkMode =
        root.classList.contains('dark') ||
        root.getAttribute('data-theme') === 'dark';
  
      if (isDarkMode) {
        setTextColor('white');
      } else {
        setTextColor('black');
      }
    };
  
    // Initial check
    updateTextColor();
  
    // Observer to detect class attribute changes
    const observer = new MutationObserver(updateTextColor);
    observer.observe(root, { attributes: true, attributeFilter: ['class', 'data-theme'] });
  
    // Cleanup
    return () => observer.disconnect();
  }, []);


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: !!title,
        text: title,
        font: {
          size: 18,
        },
        color: textColor,
      },
      legend: {
        position: 'top',
        labels: {
          color: textColor,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: !!xLabel,
          text: xLabel,
          color: textColor,
        },
        ticks: {
          color: textColor,
        },
      },
      y: {
        title: {
          display: !!yLabel,
          text: yLabel,
          color: textColor,
        },
        ticks: {
          color: textColor,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow"
      style={{ height: '400px' }}
    >
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;
