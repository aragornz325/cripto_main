import styled from 'styled-components';
import * as palette from '../../../../utils/colors/palettes/default';

export const Image = styled.img`
  // transition: 5s;
  width: 6%;
  position: absolute;
  transition: .75s;
  left: 47%;
  bottom: 100%;
  transform: scale(0);
  transition-timing-function: ease-in-out;
  border-radius: .35vw;
  box-shadow: ${props => props.glowing ? '0 0 .5vw ' + palette.sPink : 'none'};

  @media (max-width: 650px){
    display: none;
  }
`