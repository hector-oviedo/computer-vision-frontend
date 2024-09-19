// src/pages/index.js
import React from 'react';
import { Provider } from 'react-redux';
import store from '../store'; // Ensure you have a Redux store setup
import Header from '../components/Header';
import ConfigLoader from '../components/ConfigLoader';
import ClientView from '../components/ClientView';

const Home = () => {
  return (
    <Provider store={store}>
      <Header />
      <ConfigLoader>
        <ClientView />
      </ConfigLoader>
    </Provider>
  );
};

export default Home;
