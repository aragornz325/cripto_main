import React from 'react';
import { Wrapper, UiChip, UiChipRenderer } from './styles.js';
import addBet from '../../../../store/actionCreators/addBet.js';
import store from '../../../../store/reducers/store.js';
import setBetChips from '../../../../store/actionCreators/setBetChips.js';
import {Howl, Howler} from 'howler';

function BjUi() {
  store.subscribe(()=>{
    Howler.volume(store.getState().volume);
  })

  let sound = new Howl({
    src: ['assets/sound/chip.mp3']
  })

  const chipList = [1,5,10,25,50,100,200,500,1000];

  const playChip = (num) => {
    sound.play();
    addBet(0, num);
  }

  return (
    <Wrapper>
      {chipList.map((chip, index)=>{
        const str = `assets/fichas/f${chip}.png`;
        return (
          <UiChip key={index}>
            <UiChipRenderer src={str} onClick={() => playChip(chip)}/>
          </UiChip>
        )
      })}
    </Wrapper>
  )
}

export default BjUi;
