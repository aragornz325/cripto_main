import React, { useState, useEffect } from 'react';
import store from '../../../../store/reducers/store.js';
import { Image } from './styles.js';
import drawCard from '../../../../store/actionCreators/drawCard.js';

const StaticCard = ({ index, imgSrc, owner, glowing }) => {
  
  const [size, setSize] = useState(1);
  const [delayed, setDelayed] = useState(false);

  useEffect(()=>{
    drawCard(true);
    setTimeout(()=>{
      setDelayed(true);
    }, 300)
  }, [])

  let newStyle = {};
  switch(owner){
    case 'deck':
      newStyle = { bottom: '45%', left:'33%' }
      break;
    case 'user':
      newStyle = { bottom: '20%', left:'70%'  }
      break;
    case 'dealer':
      newStyle = { bottom: '70%', left:'-15%' }
      break;
  }

  return (
      <Image glowing={glowing} style={delayed ? {marginLeft: 7*index + '%', transform: 'scale(1)', ...newStyle} : {}} src={`assets/cartas/${imgSrc}.png`}/>
  )
}

export default StaticCard;
