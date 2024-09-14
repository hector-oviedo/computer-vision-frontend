// src/slices/settingsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadSettingsFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
  }
  return {
    darkMode: false,
    textSize: 'medium', // Options: 'small', 'medium', 'large'
  };
};

const initialState = loadSettingsFromLocalStorage();

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    setTextSize(state, action) {
      state.textSize = action.payload;
    },
    setSettings(state, action) {
      state.darkMode = action.payload.darkMode;
      state.textSize = action.payload.textSize;
    },
  },
});

export const { toggleDarkMode, setTextSize, setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
