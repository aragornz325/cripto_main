import styled from 'styled-components';
import * as palette from '../../../../utils/colors/palettes/default';

export const Btn = styled.button`
  font-size: 1vw;

  color: ${palette.text};
  background: ${palette.sDarkBackground};
  border: .2vw solid ${props => props.color || '#FFF'};
  border-radius: 100vw;
  box-shadow: 0 0 .3vw ${props => props.color || '#FFF'};
  transition: ${palette.tHover};
  font-weight: 700;
  height: 80%;
  width: 25%;
  transition: .5s;
  z-index: 99999;
  @media (max-width: 650px){
    display: none;
  }

  @media not handheld {
    &:hover {
      background-color: ${props => props.color};
      color: #000;
      box-shadow: 0px 0px 15px ${props => props.color}
    }
  }

`