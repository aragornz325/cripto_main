import React, { useState, useEffect } from 'react';
import store from '../../../../store/reducers/store.js';
import { Image } from './styles.js';
import drawCard from '../../../../store/actionCreators/drawCard.js';

const StaticCard = ({index, imgSrc, isDealer, game, splitIndex}) => {
  
  const [size, setSize] = useState(1);
  const [delayed, setDelayed] = useState(false);

  useEffect(()=>{
    drawCard(true);
    setTimeout(()=>{
      setDelayed(true);
    }, 300)
  }, [])

  let style = isDealer ? { 
    paddingLeft: 2*index + 'vw',
    paddingTop: 2*index + 'vw', 
    zIndex: index + 2,
    top: '16%',
    left: '45%'

  } : (game === 0) ? {
    paddingLeft: 2*index + 'vw',
    paddingTop: 2*index + 'vw', 
    zIndex: index + 2,
    top: '55%',
    left: '6%',

  } : (game === 1) ? {
    paddingLeft: 2*index + 'vw',
    paddingTop: 2*index + 'vw', 
    zIndex: index + 2,
    top: '60%',
    left: '45%',

  } : (game === 2) ? {
    paddingLeft: 2*index + 'vw',
    paddingTop: 2*index + 'vw', 
    zIndex: index + 2,
    top: '55%',
    left: '83%',

  } : '';

  if(splitIndex === 0){
    style.marginLeft = '-8%'
  }else if(splitIndex === 1){
    style.marginLeft = '8%'
  }
  
  useEffect(()=>{
    if(store.getState().gameIndex.length === undefined && game === store.getState().gameIndex){
      setSize(1.25);
    }else if(store.getState().gameIndex.length === undefined){
      setSize(1);
    }else if(store.getState().gameIndex.length === 2 && game === store.getState().gameIndex[0] && splitIndex === store.getState().gameIndex[1]){
      setSize(1.25);
    }else{
      setSize(1);
    }
  }, [])

  style.transform = `scale(${size}) scaleX(1)`;
  let newStyle = {};
  
  store.subscribe(()=>{
    if(store.getState().gameIndex.length === undefined && game === store.getState().gameIndex){
      setSize(1.25);
    }else if(store.getState().gameIndex.length === undefined){
      setSize(1);
    }else if(store.getState().gameIndex.length === 2 && game === store.getState().gameIndex[0] && splitIndex === store.getState().gameIndex[1]){
      setSize(1.25);
    }else{
      setSize(1);
    }
  })

  return (
      <Image style={delayed ? style : newStyle} id={`cardSide${index}`} className='unflipped' src={`assets/cartas/${imgSrc}.png`}/>
  )
}

export default StaticCard;