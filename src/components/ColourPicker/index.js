/*global chrome*/
import React, { useState, useEffect } from 'react';
import './index.css';

const ColourPicker = () => {
  const [enabled, setEnabled] = useState(false);
  const [value, setValue] = useState('#000000');

  useEffect(() => {
    chrome.runtime.sendMessage({
      message: 'get-checked'
    }, function(response) {
      setEnabled(response);
    });
  }, []);

  function toggleCheck() {
    chrome.runtime.sendMessage({
      message: 'set-checked',
      payload: !enabled
    }, function(response) {
      setEnabled(response);
    });
  }

  function handleChange(e) {
    const { target: { value } } = e;
    chrome.runtime.sendMessage({
      message: 'set-color',
      payload: value
    }, function() {
      setValue(value);
    });
  }

  return (
    <form className="colour-picker-form">
      <div className="enable-wrapper input-wrapper">
        <label htmlFor="enable" className="enable-label">Enable</label>
        <input type="checkbox" onClick={toggleCheck} checked={enabled}/>
      </div>
      <div className="picker-wrapper input-wrapper">
        <label htmlFor="picker">Pick your colour</label>
        <input type="color" name="picker" value={value} onChange={ enabled && handleChange}/>
      </div>
    </form>
  );
};

export default ColourPicker;