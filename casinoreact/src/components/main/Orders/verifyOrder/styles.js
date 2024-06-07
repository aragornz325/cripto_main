import styled from "styled-components"
import * as palette from '../../../../utils/colors/palettes/default';

export const Input = styled.input`
  position: relative;
  position: relative;
  width: calc(100% - 16px);
  border-radius: 12px;
  padding: 15px 8px;
  background: ${palette.background};
  border: 1px solid ${palette.sLightblue};
  font-size: 17px;
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

export const ContinueButton = styled.button`
  width: 100%;
  height: 56px;
  border-radius: 12px;
  background: linear-gradient(99.99deg, #B936F5 -21.45%, #C64C85 100%, #F1005B 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 24px;
  transition: all 0.3s ease;
  &:hover{
    box-shadow: 0 0 4px ${palette.pPink};
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
