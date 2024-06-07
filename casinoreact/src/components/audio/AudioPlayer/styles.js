import styled from "styled-components";
import * as palette from '../../../utils/colors/palettes/default';

export const Mute = styled.button`
  position: absolute;
  left: 1%;
  bottom: 1.5%;
  z-index: 2;
  font-size: 1.5vw;
  background: none;
  border-radius: .7vw;
  border: none;
  display: flex;
  padding: .3vw;
  align-items: center;
  justify-content: center;
  opacity: 0.3;
  transition: .5s;

  &:hover {
    opacity: 1;
  }

  @media handheld {
    opacity: 1;
  }

  @media (max-width: 650px){
    display: none;
  }
`

export const Slider = styled.input`
  position: absolute;
  bottom: 8.25%;
  left: 1%;
  z-index: 999;
  height: 1%;
  width: 3%;
  background: ${palette.sPink};
  outline: none;
  opacity: .3;
  z-index: 1000000;
  transition: 2s;
  -webkit-appearance: none;
  border-radius: 2vw;
  border: none;
  cursor: pointer;
  &:hover {
    width: 7%;
    opacity: 1;
  }

  @media handheld {
    opacity: 1;
    width: 10%;
  }

  @media (max-width: 650px){
    display: none;
  }
`

export const Selector = styled.div`
  display: flex;
  width: 5%;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 8%;
  left: 2.3%;
  height: 5%;
`

export const SelectBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1vw;
  cursor: pointer;
  background: gold;
  border: .2vw solid black;
  border-radius: 1vw;
  display: flex;
  padding: .1vw;
  align-items: center;
  justify-content: center;
  opacity: 0.3;
  transition: .5s;

  &:hover {
    opacity: 1;
  }

  @media handheld {
    opacity: 1;
  }

  @media (max-width: 650px){
    display: none;
  }
`