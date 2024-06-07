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
  width: min(500px, 95%);
  height: calc(95vh - 40px);
  background: ${palette.sBackground};
  border-radius: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 2.5vh;
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

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 40px;
`

export const Title = styled.p`
  font-size: 32px;
  font-weight: 600;
  color: ${palette.sLightblue};
`

export const Icon = styled.img`
  width: 42px;
`

export const Items = styled.div`
  display: flex;
  height: calc(95% - 40px);
  width: 90%;
  border-radius: 12px;
  overflow-y: auto;
  flex-wrap: wrap;
  justify-content: space-evenly;

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: ${palette.sDarkBlue};
    border-radius: 12px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${palette.sLightblue};
    border-radius: 12px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${palette.text};
  }
`

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background: ${palette.popupItemBackground};
  width: max(40%, 150px);
  height: 225px;
  margin-bottom: 12px;
  border-radius: 10px;
  padding: 12px 0;
  border: 1px ${palette.blueBorder} solid;
`

export const ItemTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: ${palette.text};
  margin: 0;
`

export const Image = styled.img`
  height: 42%;
`

export const Coins = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${palette.softBackground};
  border-radius: 16px;
  gap: 6px;
  width: 80%;
  padding: 4px 0;
`

export const CoinsText = styled.p`
  font-size: 16px;
  color: ${palette.text};
  margin: 0;
`
export const CoinsIcon = styled.img`
  width: 16px;
  height: 16px;
`

export const Buy = styled.button`
  font-size: 22px;
  font-weight: 600;
  border: none;
  border-radius: 24px;
  background: ${palette.buyBlue};
  padding: 2px 0;
  width: 70%;
  transition: ${palette.tHover};

  &:hover {
    transform: scale(1.05);
  }
`