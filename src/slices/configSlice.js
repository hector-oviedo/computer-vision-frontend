// src/slices/configSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  frames: [],
  models: [],
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setFrames(state, action) {
      state.frames = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('frames', JSON.stringify(state.frames));
      }
    },
    setModels(state, action) {
      state.models = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('models', JSON.stringify(state.models));
      }
    },
    loadConfigFromLocalStorage(state) {
      if (typeof window !== 'undefined') {
        const savedFrames = localStorage.getItem('frames');
        const savedModels = localStorage.getItem('models');
        if (savedFrames) {
          state.frames = JSON.parse(savedFrames);
        }
        if (savedModels) {
          state.models = JSON.parse(savedModels);
        }
      }
    },
  },
});

export const { setFrames, setModels, loadConfigFromLocalStorage } = configSlice.actions;
export default configSlice.reducer;
