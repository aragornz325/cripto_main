import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    bottom: -22%;
  }
  100% {
    bottom: 12px;
  }
`

export const Bar = styled.div`
  position: fixed;
  bottom: 24px;
  right: 12px;
  z-index: 99999999999; 
  border-radius: 10px;
  box-shadow: 0 0 8px black;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  background: #222222;
  padding: 0;
  padding: 0px 24px;

  animation-name: ${fadeIn};
  animation-duration: 2s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
`

export const ExitBtn = styled.button`
  position: absolute;
  top: 10%;
  right: 1%;
  color: black;
  background: none;
  font-size: 22px;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 10px;
  transition: 1s;
  padding: 0;
`

export const Text = styled.p`
  color: white;
`

export const Link = styled.a`
  color: gold;
`