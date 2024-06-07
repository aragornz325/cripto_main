import React from 'react';
import { Circle } from './styles.js';

const Marker = ({ width, height, top, left, hidden }) => {

  return (
    <Circle hidden={hidden} style={{width, height, top, left}}>
    </Circle>
  )
}

export default Marker;