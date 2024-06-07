import styled from "styled-components";
import * as palette from '../../../../utils/colors/palettes/default';

export const Container = styled.div`
  width: ${props => props.big ? 'calc(65%)' : '30%'};
  height: 370px;
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  background: ${palette.gameBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 2px ${palette.blueBorder};
`

export const GameBG = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
`

export const GameContent = styled.div`
  width: 100%;
  height: 100%;
  backdrop-filter: blur(12px);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

export const GameTitle = styled.p`
  font-size: 21px;
  color: ${palette.text};
  font-weight: 800;
  margin: 20px 0 0 20px;
  width: calc(100% - 12px);
`

export const GamePreview = styled.img`
  width: 100%;
  object-fit: fill;
  border-radius: 8px;
`

export const GameOptions = styled.div`
  display: flex;
  width: 85%;
  padding: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`

export const GameInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

export const GamePlayers = styled.p`
  margin: 0;
  color: ${palette.inputText};
  font-size: 12px;
  font-weight: 400;
`

export const GamePrice = styled.div`
  background: ${palette.softBackground};
  height: 100%;
  border-radius: 24px;
  padding: 1px 16px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
`

export const Coin = styled.img`
  width: 12px;
  height: 12px;
`

export const GameButtons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

export const GameButton = styled.button`
  font-size: 16px;
  font-weight: 700;
  color: ${palette.text};
  background: ${palette.submitPink};
  border: none;
  padding: 6px 26px;
  border-radius: 20px;
  height: 100%;
  width: min(calc(100% - 54px), 120px);
  cursor: pointer;
  transition: ${palette.tHover};

  &:hover{
    transform: scale(1.05);
  }
`

export const GameFav = styled.img`
  width: 38px;
  height: 38px;
  cursor: pointer;
  transition: ${palette.tHover};

  &:hover{
    transform: scale(1.05);
  }
`