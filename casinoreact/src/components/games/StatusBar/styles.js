import styled from 'styled-components';
import * as palette from '../../../utils/colors/palettes/default';

export const Bar = styled.div`
  height: 8%;
  width: 100%;
  position: absolute;
  bottom: 100%;
  left: 0;
  z-index: 9999999;
  background: ${palette.sPink};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 2.25rem;
  border-top-left-radius: .5vw;
  border-top-right-radius: .5vw;
  
  @media (max-width: 650px) {
    display: none;
  }

  &::before {
    opacity: .4;
  }
`

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  color: black;
  height: 100%;
  width: 30%;
`

export const Title = styled.h3`
  font-size: 1vmax;
  font-weight: 700;
  margin: 0;
`

export const Content = styled.h4`
  margin: 0;
  font-size: .9vmax;
  font-weight: 600;
`