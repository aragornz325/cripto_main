import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    right: -22%;
  }
  100% {
    right: 0%;
  }
`

export const Bar = styled.div`
  width: 22%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 99999999999; 
  padding: 0 2%;
  border-bottom-left-radius: 24px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  text-align: center;

  animation-name: ${fadeIn};
  animation-duration: .7s;
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