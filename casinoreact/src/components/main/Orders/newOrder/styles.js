import styled from "styled-components"
import * as palette from '../../../../utils/colors/palettes/default';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 60%;
  margin-top: 4vh;
`


export const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  color: #fff;
  margin: 0px;
  text-align: left;
`

export const Input = styled.input`
  position: relative;
  width: 100%; 
  font-size: 17px;
  outline: none;
  background: none;
  border: none;
  color: ${palette.inputText};
  transition: ${palette.tFocus};
  &::placeholder{
    color: ${palette.inputText};
  } 
  &:focus{
    font-size: 18px;
  }
`

export const InputCopy = styled.div`
  position: relative;
  width: calc(100% - 16px);
  border-radius: 12px;
  padding: 15px 8px;
  background: ${palette.background};
  border: 1px solid ${palette.sLightblue};
  img {
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 20px;
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

export const Bold = styled.p`
  font-weight: 600;
  color: ${palette.sLightblue};
  margin: 0;
`
export const Required = styled.p`
  color: ${palette.sPink};
  margin: 0;
`

export const SmallText = styled.p`
  text-align: ${props => props.center ? "center" : "left"};
  font-size: 1rem;
  margin: 0;
  font-weight: 400;

`
export const LightText = styled.p`
  text-align: ${props => props.center ? "center" : "left"};
  font-size: 1rem;
  margin: 0;
  font-weight: 300;

`

export const Image = styled.img`
  display: block;
  margin: 0 auto;
`
export const TitleIcon = styled.img`
  width: 36px;
  height: 36px;
  margin: 1rem;
`

export const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`

export const ContinueButton = styled.div`
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
export const IconWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  top: 24rem;
  left: 11rem;
`

export const VioletText = styled.p`
display: block;
  color: #eaa6fa;
  margin: 0;
`
