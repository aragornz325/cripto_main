import React, { useState } from 'react';
import { Wrapper, UiChip, UiChipRenderer, Marker } from './styles.js';
import addBet from '../../../../store/actionCreators/addBet.js';
import store from '../../../../store/reducers/store.js';
import setBetChips from '../../../../store/actionCreators/setBetChips.js';
import setGames from '../../../../store/actionCreators/setGames.js';
import {Howl, Howler} from 'howler';

function BjUi({index}) {

  store.subscribe(()=>{
    Howler.volume(store.getState().volume);
  })

  const addChip = () => {
    let newGames = store.getState().games;
    newGames[index] = true;
    setGames(newGames)
  }

  let sound = new Howl({
    src: ['assets/sound/chip.mp3']
  })

  const chipList = [1,5,25,100,500];

  const playChip = (num) => {
    sound.play();
    addBet(index, num);
    addChip();
  }

  const [marker, setMarker] = useState(-1);

  return (
    <Wrapper>
      {chipList.map((chip, index)=>{
        const str = `assets/fichas/f${chip}.png`;
        return (
          <UiChip key={index} onMouseEnter={() => setMarker(index)} onMouseLeave={() => setMarker(-1)}>
            {marker === index && <Marker>{chip}</Marker>}
            <UiChipRenderer src={str} onClick={() => playChip(chip)}/>
          </UiChip>
        )
      })}
    </Wrapper>
  )
}

export default BjUi;
