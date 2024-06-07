import styled from "styled-components";
import * as palette from '../../../utils/colors/palettes/default';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: min(500px, 90%);
  align-items: center;
`

export const LabelSmall = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin: 24px 0 16px 0;
  color: ${palette.text};
  display: flex;
  align-items: center;
  gap: 8px;
`

export const Required = styled.p`
  color: ${palette.sPink};
  margin: 0;
`

export const Bold = styled.p`
  font-weight: 600;
  color: ${palette.sLightblue};
`

export const InputSmall = styled.input`
  width: calc(50% - 16px);
  background: ${palette.background};
  border: 1px solid ${palette.sLightblue};
  font-size: 17px;
  border-radius: 12px;
  padding: 15px 8px;
  outline: none;
  color: ${palette.inputText};
  transition: ${palette.tFocus};
  font-weight: 500;

  &:focus{
    font-size: 18px;
  }
`

export const Label = styled.div`
  font-size: 20px;
  font-weight: 500;
  width: 100%;
  margin: 24px 0 16px 0;
  color: ${palette.text};
  display: flex;
  align-items: center;
  gap: 8px;
`

export const Input = styled.input`
  width: calc(100% - 16px);
  background: ${palette.background};
  border: 1px solid ${palette.sLightblue};
  font-size: 17px;
  border-radius: 12px;
  padding: 15px 8px;
  outline: none;
  color: ${palette.inputText};
  transition: ${palette.tFocus};

  &:focus{
    font-size: 18px;
  }
`

export const Submit = styled.button`
  width: 100%;
  background: ${palette.submitPink};
  color: ${palette.text};
  font-size: 24px;
  font-weight: 600;
  padding: 12px 0;
  margin-top: 32px;
  border: none;
  border-radius: 12px;
  transition: ${palette.tHover};

  &:hover {
    transform: scale(1.02);
  }

  &:focus {
    outline: 1px solid ${palette.text};
    transform: scale(1.02);
  }
`