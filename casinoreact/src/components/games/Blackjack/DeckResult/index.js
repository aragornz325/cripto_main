import React from 'react';
import { Alert } from './styles.js';

const DeckResult = ({index, background, text, marginLeft}) => {

  let style = index === 0 ? {
    top: '27%',
    left: '5.5%',
    background,
  } : index === 1 ? {
    top: '32%',
    left: '44%',
    background,
  } : {
    top: '27%',
    left: '82.5%',
    background,
  }
  console.log(marginLeft)
  if(marginLeft){
    style = {...style, marginLeft};
  }

  return (
    <Alert style={style}>
      <p style={{color: 'black'}}>{text}</p>
    </Alert>
  )
}

export default DeckResult;