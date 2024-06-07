import React from 'react';
import { Btn } from './styles.js';

const OptionButton = ({ text, clickFunction, color }) => {
  return (
      <Btn onClick={clickFunction} color={color}>{text}</Btn>
  )
}

export default OptionButton;
