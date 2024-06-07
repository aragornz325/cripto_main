import styled, { keyframes } from 'styled-components';
import * as palette from '../../../utils/colors/palettes/default';

const open = keyframes`
  0% { font-size: 0; padding: 0; }
  100% { font-size: 1.25vw; padding: .8vw 0; }
`

export const Bar = styled.div`
  width: 100%;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 9999999;
  opacity: .9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  background: ${palette.submitPink};
  animation: ${open} .6s forwards ease-in-out 1;
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
  color: ${palette.text};
  margin: 0;
`