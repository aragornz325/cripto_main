import React, { useState, useEffect } from 'react'
import store from '../../../../store/reducers/store';
import { Flipcard, Background } from './styles';
import drawCard from '../../../../store/actionCreators/drawCard';
import {Howl, Howler} from 'howler';


function Deck() {
  
  const [flip, setFlip] = useState(false);
  const sound = new Howl({
    src: ['assets/sound/card.mp3']
  })

  useEffect(()=>{
    return () => Howler.volume(Number(store.getState().volume));
  }, [])

  store.subscribe(()=>{
    if(store.getState().drawCard && !flip){
      setFlip(true);
      drawCard(false);
      sound.play();
      Howler.volume(Number(store.getState().volume));
    }
  })


  let flipped = {};
  useEffect(()=>{
    setTimeout(()=>{
      flipped.transform = 'scaleX(1) scale(1)'
      setFlip(false);
    }, 300);
  }, [flip])

  if(flip){
    flipped = {
      transform: 'scaleX(0) scale(1.3)'
    }
  }

  return (
    <React.Fragment>
      <Flipcard style={flip ? flipped : {}} src={`assets/cartas/card-back.png`} alt="Card"/>
      <Background src={`assets/cartas/card-back.png`} alt="Card"/>
    </React.Fragment>
  )
}

export default Deck;
