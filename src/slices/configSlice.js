// src/slices/configSlice.js
import { createSlice } from '@reduxjs/toolkit';

const configSlice = createSlice({
  name: 'config',
  initialState: {
    frames: [],
    models: [],
  },
  reducers: {
    setFrames(state, action) {
      state.frames = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('frames', JSON.stringify(state.frames));
      }
    },
    setModels(state, action) {
      state.models = action.payload;/*
      if (typeof window !== 'undefined') {
        localStorage.setItem('models', JSON.stringify(state.models));
      }*/
    },/*
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
    },*/
    toggleModelSelected(state, action) {
      const index = action.payload;
      if (state.models[index]) {
        state.models[index].selected = !state.models[index].selected;
        if (typeof window !== 'undefined') {
          localStorage.setItem('models', JSON.stringify(state.models));
        }
      }
    },
    addModel(state, action) {
      state.models.push(action.payload);/*
      if (typeof window !== 'undefined') {
        localStorage.setItem('models', JSON.stringify(state.models));
      }*/
    },
    updateModel(state, action) {
      const { index, updates } = action.payload;
      if (state.models[index]) {
        state.models[index] = { ...state.models[index], ...updates };
        if (typeof window !== 'undefined') {
          localStorage.setItem('models', JSON.stringify(state.models));
        }
      }
    },
  },
});

export const {
  setFrames,
  setModels,
  loadConfigFromLocalStorage,
  toggleModelSelected,
  addModel,
  updateModel,
} = configSlice.actions;
export default configSlice.reducer;
