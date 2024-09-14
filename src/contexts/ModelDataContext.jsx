// src/contexts/ModelDataContext.jsx
"use client";

import React, { createContext, useState } from 'react';

export const ModelDataContext = createContext();

export const ModelDataProvider = ({ children }) => {
  const [modelDataMap, setModelDataMap] = useState({});

  const addModelData = (modelName, data) => {
    setModelDataMap((prev) => ({
      ...prev,
      [modelName]: data,
    }));
  };

  return (
    <ModelDataContext.Provider value={{ modelDataMap, addModelData }}>
      {children}
    </ModelDataContext.Provider>
  );
};
