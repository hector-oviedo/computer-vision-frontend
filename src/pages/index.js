// src/pages/index.js
import React from 'react';
import Header from '../components/Header';
import FramesSummary from '../components/FramesSummary';
import ModelsList from '../components/ModelsList';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-6 bg-gray-100 dark:bg-gray-900">
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            Configuration Summary
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Frames Summary */}
            <FramesSummary />

            {/* Models List */}
            <ModelsList />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;