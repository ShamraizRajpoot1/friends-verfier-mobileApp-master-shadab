import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';

const CustomSwitch = ({
  onColor,
  offColor,
  thumbOffStyle,
  value,
  toggleSwitch,
  trackOffStyle,
  trackOnStyle,
  onToggle
}) => {
  return (
    <ToggleSwitch
      isOn={value}
      onColor={onColor}
      offColor={"#FFFFFF"}
      thumbOffStyle={thumbOffStyle}
     // thumbOnStyle={appStyles.thumbOnStyle}
      size="large"
      value={value}   
      trackOffStyle={trackOffStyle}
      onToggle={toggleSwitch}  
      trackOnStyle={trackOnStyle}
    />
  );
};
export default CustomSwitch;