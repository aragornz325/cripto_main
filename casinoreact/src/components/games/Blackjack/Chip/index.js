import React, { useState } from 'react';
import { Wrapper, Info } from './styles.js';
import store from '../../../../store/reducers/store.js';

const Chip = ({ index, hidden }) => {

  const [bet, setBet] = useState(0);
  const [lastBet, setLastBet] = useState(0);
  const [render, setRender] = useState(false);

  store.subscribe(()=>{
    if(store.getState().gameState === 'none' && store.getState().bet[index] !== bet){
      const currentBet = store.getState().bet[index];
      setLastBet(currentBet - bet);
      setBet(currentBet);
    }
  })

  const style = (index === '0') ? {
    top: "30.5%",
    left: "8.4%"
  } : (index === '1') ? {
    top: "66%",
    left: "62%"
  } : {
    top: "30.5%",
    left: "85.8%"
  };

  const infostyle = (index === '0') ? {
    left: '4%',
    bottom: '49.5%'
  } : (index === '1') ? {
    left: '57.3%',
    bottom: '31%'
  } : {
    left: '81.5%',
    bottom: '49.5%'
  };

  if(!render && lastBet){
    setTimeout(()=>{
      setRender(true);
    }, 10)
  }

  if(bet){
    return (
      <>
        <Wrapper hidden={hidden} id="betChip"  style={render ? {...style, transform: 'scale(1)'} : style} src={`assets/fichas/f${lastBet}.png`}/>
        <Info hidden={hidden} style={infostyle}>Bet: {store.getState().bet[index]}</Info>
      </>
      )
  }else{
    return '';
  }
}

export default Chip;