import React, { useState, useEffect } from "react";
import { Mute, Slider, Selector, SelectBtn } from './styles';
import { FaArrowLeft, FaArrowRight, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import {Howl, Howler} from 'howler';
import store from "../../../store/reducers/store";
import setVolume from "../../../store/actionCreators/setVolume";

const AudioPlayer = ({ url, loop, slider, list }) => {

  const [playing, setPlaying] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(store.getState().volume);

  const [audio] = useState(new Howl({
    src: [url],
    loop
  }))

  const toggle = () => {
    if(playing){
      audio.play();
    }else{
      audio.pause();
    }
  }
  
  Howler.volume(store.getState().volume);
  useEffect(()=>{
    audio.play()
    return () => audio.unload()
  }, [])

  useEffect(()=>{
    setVolume(volumeLevel);
  }, [volumeLevel])

  return (
    <div>
      <Mute onClick={() => {setPlaying(!playing); toggle()}}>{playing ? <FaVolumeMute /> : <FaVolumeUp />}</Mute>
      {slider && !playing ? 
        <Slider
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={volumeLevel}
          onChange={event => {
            setVolumeLevel(event.target.valueAsNumber)
          }} 
        />
      : ''}
      {list && !playing ? (
        <Selector>
          <SelectBtn><FaArrowLeft/></SelectBtn>
          <SelectBtn><FaArrowRight/></SelectBtn>
        </Selector>
      ) : ''}
    </div>
  );
};

export default AudioPlayer;