// src/components/FrameRangeSelector.jsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const FrameRangeSelector = ({ min, max, value, onChange, onChangeEnd }) => {
  const [minVal, setMinVal] = useState(value[0]);
  const [maxVal, setMaxVal] = useState(value[1]);

  const range = useRef(null);

  // Memoize getPercent to prevent it from changing on every render
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    if (range.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxVal);
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
    // Notify parent component of the change
    onChange([minVal, maxVal]);
  }, [minVal, maxVal, getPercent, onChange]);

  // Handle changes from the slider
  const handleSliderChange = (e, type) => {
    const value = Number(e.target.value);
    if (type === 'min') {
      setMinVal(Math.min(value, maxVal - 1));
    } else {
      setMaxVal(Math.max(value, minVal + 1));
    }
  };

  // Handle the end of slider interaction for the min slider
  const handleMinSliderEnd = () => {
    onChangeEnd([minVal, maxVal]);
  };

  return (
    <div className="frame-range-selector">
      <div className="slider-container">
        {/* Minimum Slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(e) => handleSliderChange(e, 'min')}
          onMouseUp={handleMinSliderEnd}
          onTouchEnd={handleMinSliderEnd}
          onKeyUp={handleMinSliderEnd}
          className="thumb thumb--left"
          aria-label="Minimum Frame"
        />

        {/* Maximum Slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(e) => handleSliderChange(e, 'max')}
          className="thumb thumb--right"
          aria-label="Maximum Frame"
        />

        {/* Slider Track */}
        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
          <div className="slider__left-value">{minVal}</div>
          <div className="slider__right-value">{maxVal}</div>
        </div>
      </div>
    </div>
  );
};

FrameRangeSelector.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeEnd: PropTypes.func.isRequired, // New Prop
};

export default FrameRangeSelector;
