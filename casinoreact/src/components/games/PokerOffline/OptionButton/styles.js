import styled from 'styled-components';
import * as palette from '../../../../utils/colors/palettes/default';

export const Btn = styled.button`
  font-size: 1.2vw;
  color: ${palette.text};
  background: ${palette.submitPink};
  border: none;
  border-radius: 1vw;
  transition: ${palette.tHover};
  font-weight: 700;
  margin-bottom: .1%;
  position: relative;
  padding: .4vw 1.5vw;
  margin-right: 1%;
  @media (max-width: 650px){
    display: none;
  }

  @media not handheld {
    &:hover {
      transform: scale(1.05);
    }
  }
`

export const BtnDisabled = styled.button`
  font-size: 1.2vmax;
  color: ${palette.text};
  background: ${palette.submitPink};
  opacity: 0.5;
  border-radius: 1vw;
  border: none;
  transition: ${palette.tHover};
  margin-bottom: .1%;
  position: relative;
  padding: .4vw 1.5vw;
  margin-right: 1%;
  @media (max-width: 650px){
    display: none;
  }
`