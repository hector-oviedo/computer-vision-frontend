// src/slices/configSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  config: null, // To store the configuration data
  models: [],    // To store the models data
  frames: [],    // Existing frames data, if any
  theme: 'light',
  textSize: 'medium',
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfig(state, action) {
      state.config = action.payload;
    },
    setModels(state, action) {
      state.models = action.payload;
    },
    setTheme(state, action) {
      state.theme = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', action.payload);
        // Update the document class for dark mode
        if (action.payload === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    },
    setTextSize(state, action) {
      state.textSize = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('textSize', action.payload);
      }
    },
    loadThemeFromLocalStorage(state) {
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme');
        const savedTextSize = localStorage.getItem('textSize');
        if (savedTheme) {
          state.theme = savedTheme;
        }
        if (savedTextSize) {
          state.textSize = savedTextSize;
        }
      }
    },
  },
});

export const { setConfig, setModels, setTheme, setTextSize, loadThemeFromLocalStorage } = configSlice.actions;
export default configSlice.reducer;
