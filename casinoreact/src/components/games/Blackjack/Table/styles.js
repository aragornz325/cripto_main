import styled from 'styled-components';
import * as palette from '../../../../utils/colors/palettes/default';

export const Wrapper = styled.img`
  width: 100%;
  height: 100%;
  background: ${palette.sDarkBackground};
  position: relative;
  z-index: -1;
  border-bottom-left-radius: 1.2vw;
  border-bottom-right-radius: 1.2vw;
  @media (max-width: 650px){
    display: none;
  }
`

export const Msg = styled.h1`
  text-align: center;
  color: ${palette.text};
  margin-top: 10vh;
  z-index: 999999;
  @media (min-width: 650px){
    display: none;
  }
`