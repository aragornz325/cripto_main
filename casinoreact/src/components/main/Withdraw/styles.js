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
  margin: 0;
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
  margin: 24px 0 16px 0;
  width: 100%;
  color: ${palette.text};
  display: flex;
  align-items: center;
  gap: 8px;
`

export const Input = styled.input`
  width: calc(100% - 16px);
  background: #233769;
  border: 1px solid ${palette.sLightblue};
  font-size: 17px;
  border-radius: 12px;
  padding: 15px 8px;
  outline: none;
  color: ${palette.inputText};
  transition: ${palette.tFocus};

  &::placeholder{
    color: ${palette.inputText};
  }
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

export const ModalContainer = styled.div`
  position: relative;
  margin: 0 auto;
  text-align: center;
  h2{
    margin-bottom: 0;
  }
  p{
    margin: 10px 0;
    font-size: 14px;
  }
  button{
    padding: .7rem 2rem;
    width: 250px;
    font-size: 14px;
    border: none;
    background: linear-gradient(99.99deg, #B936F5 -21.45%, #C64C85 100%, #F1005B 100%);
    border-radius: 100px;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
  span{
    user-select: none;
    font-size: 20px;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
  }
`