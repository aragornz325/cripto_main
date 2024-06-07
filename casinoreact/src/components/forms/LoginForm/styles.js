import styled from "styled-components";
import * as palette from '../../../utils/colors/palettes/default';

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  z-index: 999;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12 px;
  transition: ${palette.tFade};
  opacity: ${props => props.animation === 'fadeIn' ? 1 : 0};
  background: ${palette.darken};
`

export const Form = styled.form`
  width: min(500px, calc(95% - 40px));
  max-height: calc(94vh - 60px);
  background: ${palette.sBackground};
  border-radius: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  align-items: center;
  overflow-y: auto;
  margin-top: 3vh;
`

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: min-content;
  transition: ${palette.tOpen};
  width: 100%;
  margin-top: 2vh;
`

export const CloseBtn = styled.img`
  width: 16px;
  position: absolute;
  right: 24px;
  top: 24px;
  transition: ${palette.tHover};

  &:hover {
    width: 18px;
  }
`

export const Label = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: ${palette.text};
  width: min(400px, 90%);
  margin: 6px 0;
  position: relative;
  display: flex;
  overflow: hidden;
  align-items: center;
  gap: 6px;
`

export const Required = styled.p`
  font-size: 16px;
  color: ${palette.sPink};
  margin: 0;
`

export const Input = styled.input`
  width: min(376px, 90%);
  font-size: 18px;
  font-weight: 400;
  color: ${palette.inputText};
  border: 1px solid ${palette.text};
  border-radius: 12px;
  background: none;
  padding: 14px 12px;
  outline: none;
  transition: ${palette.tFocus};
  margin-bottom: 10px;
  
  &:focus {
    font-size: 19px;
    padding: 13.5px 12px;
    box-shadow: 0 0 6px ${palette.text};
  }
`

export const Submit = styled.button`
  background: ${palette.submitPink};
  width: max(65%, 150px);
  font-size: 24px;
  font-weight: 700;
  padding: 10px 0;
  color: ${palette.text};
  border: none;
  border-radius: 24px;
  transition: ${palette.tHover};
  margin-top: 2vh;
  &:hover {
    transform: scale(1.05);
    font-weight: 700;
    }
  &:focus {
    outline: 2px solid ${palette.text};
    transform: scale(1.05);
    font-weight: 700;
  }
`

export const Switch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: max(65%, 250px);
  margin-bottom: 12px;
`

export const SwitchOption = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  transition: ${palette.tFocus}; 
`

export const SwitchTitle = styled.p`
  width: 100%;
  font-size: 32px;
  text-align: center;
  font-weight: 600;
  color: ${props => props.selected ? palette.sPink : palette.text};
  margin: 0;
  transition: inherit;
`

export const SwitchBar = styled.div`
  height: 7px;
  width: 100%;
  background: ${props => props.selected ? props.side === 'left' ? palette.sPinkFadeLeft : palette.sPinkFadeRight : palette.sWhiteFade};
  border-top-left-radius: ${props => props.side === 'left' ? '8px': 0};
  border-bottom-left-radius: ${props => props.side === 'left' ? '8px': 0};
  border-top-right-radius: ${props => props.side === 'right' ? '8px': 0};
  border-bottom-right-radius: ${props => props.side === 'right' ? '8px': 0};
  transition: inherit;
`

export const Info = styled.p`
  font-size: 14px;
  color: ${palette.inputText};
  width: 80%;
  text-align: ${props => props.centered ? 'center' : 'justify'};
  margin-top: 3vh;
`

export const ExternalOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 4vh;
`

export const ExternalTitle = styled.p`
  color: ${palette.inputText};
  font-size: 12px;
  margin: 0;
` 

export const ExternalButtons = styled.div`
  display: flex;
  gap: 8px;
`

export const ExternalBtn = styled.button`
  width: 50px;
  height: 42px;
  border-radius: 50%;
  border: none;
  overflow: hidden;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${palette.tHover};

  &:hover{
    transform: scale(1.1);
  }
`

export const ExternalBtnImg = styled.img`
  width: 100%;
  height: 100%;
`

export const Recovery = styled.a`
  color: ${palette.text};
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  margin-top: 3vh;
`