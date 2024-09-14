// src/components/AppWrapper.jsx
"use client";

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSettings } from '../slices/settingsSlice';
import { setFrames } from '../slices/configSlice';
import { ModelDataProvider } from '../contexts/ModelDataContext';

const AppWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { darkMode, textSize } = useSelector((state) => state.settings);

  useEffect(() => {
    // Load settings from localStorage after the component mounts
    const savedSettings = JSON.parse(localStorage.getItem('settings'));
    if (savedSettings) {
      dispatch(setSettings(savedSettings));
    }

    // Load frames from localStorage after the component mounts
    // (Optional if you want to keep frames loading here)
    const savedFrames = JSON.parse(localStorage.getItem('frames'));
    if (savedFrames) {
      dispatch(setFrames(savedFrames));
    }
  }, [dispatch]);

  useEffect(() => {
    // Apply the 'dark' class to the <html> element
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Update text size classes on the <html> element
    document.documentElement.classList.remove('text-small', 'text-medium', 'text-large');
    document.documentElement.classList.add(`text-${textSize}`);

    // Save settings to localStorage
    const settings = {
      darkMode,
      textSize,
    };
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [darkMode, textSize]);

  return <ModelDataProvider>{children}</ModelDataProvider>;
};

export default AppWrapper;
