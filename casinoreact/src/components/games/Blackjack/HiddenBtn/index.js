import React, {useState} from 'react';
import { Btn } from './styles';
import store from '../../../../store/reducers/store';
import addBet from '../../../../store/actionCreators/addBet';
import setBetChips from '../../../../store/actionCreators/setBetChips';
import setGames from '../../../../store/actionCreators/setGames';

const HiddenBtn = ({ width, height, top, left, clickFunction, index }) => {

  const [mode, setMode] = useState(1);
  store.subscribe(()=>{
    if(store.getState().bet && store.getState().bet[index] === 0){
      setMode(1);
    }else{
      setMode(0);
    }
  })

  return (
    <Btn style={{width, height, top, left}} onClick={mode ? clickFunction : ()=>{
      addBet(index, -store.getState().bet[index]);
      let newGames = store.getState().games;
      newGames[index] = false;
      setGames(newGames)
      let newChips = store.getState().BJchips;
      if(newChips){
        newChips[index] = {
          "one": 0,
          "five": 0,
          "ten": 0,
          "twentyfive": 0,
          "fifty": 0,
          "hundred": 0,
          "twohundred": 0,
          "fivehundred": 0,
          "thousand": 0
        }
        setBetChips([...newChips]);
        setMode(1);
      }
    }}>
    </Btn>
  )
}

export default HiddenBtn;