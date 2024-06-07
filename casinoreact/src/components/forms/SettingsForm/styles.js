import styled from "styled-components";
import * as palette from '../../../utils/colors/palettes/default';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
  padding: 20px;
  gap: 50px;
`

export const Link = styled.div`
  width: min(600px, 60%);
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Label = styled.div`
  color: ${palette.text};
  font-size: 24px;
  font-weight: 500;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`

export const Required = styled.p`
  color: ${palette.activeText};
  font-size: 18px;
  font-weight: 400;
`

export const Input = styled.input`
  width: calc(100% - 32px);
  height: 60px;
  font-size: 22px;
  font-weight: 500;
  color: ${palette.inputText};
  background: transparent;
  border-radius: 15px;
  padding: 0 16px;
  border: ${palette.inputText} 2px solid;
  outline: none;
  transition: ${palette.tFocus};

  &:focus {
    border: 2px solid ${palette.activeText};
    font-size: 17px;
  }
`

export const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 18px;
`

export const CancelBtn = styled.a`
  width: min(160px, 40%);
  font-size: 24px;
  font-weight: 600;
  border-radius: 100px;
  padding: 12px 0;
  text-align: center;
  background: ${palette.sLightGrey};
  color: ${palette.text};
  border: none;
  transition: ${palette.tHover};
  outline: none;
  text-decoration: none;

  &:hover {
    transform: scale(1.05);
    font-weight: 700;
  }

  &:focus {
    outline: 2px solid ${palette.activeText};
    transform: scale(1.05);
    font-weight: 700;
  }
`

export const SubmitBtn = styled.button`
  width: min(160px, 40%);
  font-size: 24px;
  font-weight: 700;
  border-radius: 100px;
  padding: 12px 0;
  background: ${palette.submitPink};
  color: ${palette.text};
  border: none;
  transition: ${palette.tHover};
  outline: none;
  cursor: pointer;

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