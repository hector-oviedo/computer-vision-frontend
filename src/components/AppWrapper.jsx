// src/components/AppWrapper.jsx
"use client";

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ModelDataProvider } from '../contexts/ModelDataContext';

const AppWrapper = ({ children }) => {
  const { darkMode, textSize } = useSelector((state) => state.settings);

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
