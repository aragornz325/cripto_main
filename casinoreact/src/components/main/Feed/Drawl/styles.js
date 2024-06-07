import styled from "styled-components";
import * as palette from '../../../../utils/colors/palettes/default';

export const Drawls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: min(80%, 850px);
  height: 300px;
  box-shadow: 0 0 3px ${palette.sLightblue};
  border-radius: 26px;
  margin: 16px 0 24px 0;
  overflow: hidden;
`

export const DrawlInfo = styled.h2`
  width: 90%;
  font-size: 32px;
  color: ${palette.text};
  font-weight: 700;
  margin: 0;
`

export const Carousel = styled.div`
 height: 50%;
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: space-evenly;
`

export const CarouselItem = styled.img`
  width: 16%;
`

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
`

export const Division = styled.div`
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
` 

export const Favourite = styled.button`
  display: flex;
  gap: 8px;
  font-size: 14px;
  padding: 12px 16px;
  font-weight: 700;
  color: ${palette.text};
  background: ${palette.softBackground};
  border: none;
  border-radius: 14px;
  align-items: center;
  transition: ${palette.tHover};
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 2px ${palette.pGreen};
  }
`

export const FavIcon = styled.img`
  width: 16px;
  height: 13px;
`

export const Button = styled.button`
  font-size: 14px;
  font-weight: 700;
  color: ${palette.text};
  padding: 12px 36px;
  border: none;
  border-radius: 24px;
  background: ${palette.submitPink};
  transition: ${palette.tHover};
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`

export const SlideSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: ${palette.softBackground};
  padding: 8px 12px;
  border-radius: 8px;
`

export const SlideSelect = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.selected ? palette.submitPink : palette.text};
  cursor: pointer;
`