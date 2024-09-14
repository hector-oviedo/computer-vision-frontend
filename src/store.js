// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './slices/settingsSlice';
import configReducer from './slices/configSlice';

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    config: configReducer,
  },
});

export default store;
