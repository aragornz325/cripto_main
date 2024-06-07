
import React, { useState } from 'react';
import { Wrapper, Info } from './styles.js';
import store from '../../../../store/reducers/store.js';
import addBet from '../../../../store/actionCreators/addBet.js';
import resetBetChips from '../../../../store/actionCreators/resetBetChips.js';

const Chip = ({ clickable }) => {

  const [bet, setBet] = useState(0);
  const [lastBet, setLastBet] = useState(0);
  const [render, setRender] = useState(false);

  store.subscribe(()=>{
    if(store.getState().gameState === 'none' && store.getState().bet["0"] !== bet){
      const currentBet = store.getState().bet["0"];
      setLastBet(currentBet - bet);
      setBet(currentBet);
    }
  })

  const style = {
    top: "64%",
    left: "47%"
  } 

  const infostyle =  {
    left: '42.3%',
    bottom: '15.5%'
  } 

  if(!render && lastBet){
    setTimeout(()=>{
      setRender(true);
    }, 10)
  }

  if(bet){
    return (
      <>
        <Wrapper id="betChip"  style={render ? {...style, transform: 'scale(1)'} : style} src={`assets/fichas/f${lastBet}.png`} onClick={() => {if(clickable){addBet(0, -bet); resetBetChips()}}}/>
        <Info style={infostyle}>Bet:{store.getState().bet["0"]}</Info>
      </>
      )
  }else{
    return '';
  }
}

export default Chip;