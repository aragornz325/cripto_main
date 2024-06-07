import styled from 'styled-components';
import * as colors from '../../../../utils/colors';

export const Wrapper = styled.img`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: -1;
  @media (max-width: 650px){
    display: none;
  }
`

export const Msg = styled.h1`
  text-align: center;
  color: ${colors.light};
  margin-top: 10vh;
  z-index: 999999;
  @media (min-width: 650px){
    display: none;
  }
`