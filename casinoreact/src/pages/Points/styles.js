import styled from "styled-components";
import * as palette from '../../utils/colors/palettes/default';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const TitleIcon = styled.img`
  width: 36px;
  height: 36px;
`

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 600;
  color: ${palette.activeText};
`

export const BalanceContainer = styled.div`
  display: flex;
  min-width: 60%;
  align-items: center;
  justify-content: center;
  border: 2px solid ${palette.sLightblue};
  padding: 16px 8px;
  border-radius: 56px;
  gap: 16px;
`

export const BalanceTitle = styled.p`
  font-size: 32px;
  color: ${palette.text};
  font-weight: 400;
  margin: 0;
`

export const Balance = styled.p`
  font-size: 32px;
  color: ${palette.sLightblue};
  font-weight: 500;
  margin: 0;
`

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: min(600px, 90%);
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 4vh;
`

export const Item = styled.div`
  width: 280px;
  height: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4vh;
`

export const Amount = styled.p`
  width: 100px;
  height: 100px;
  border: 3px solid ${props => props.color};
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 35px;
  font-weight: 500;
  color: ${props => props.color};
  margin: 0;
`

export const ItemInfo = styled.div`
  height: 65%;
  width: calc(100% - 24px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: ${palette.popupBackground};
  padding: 12px;
  border-radius: 18px;
`

export const ItemTitle = styled.p`
  color: ${palette.text};
  font-size: 24px;
  font-weight: 700;
  width: 95%;
  margin: 0;
`

export const ItemDescription = styled.p`
  color: ${palette.sLightblue};
  font-size: 20px;
  font-weight: 700;
  width: 95%;
  margin: 0;
`

export const ItemImg = styled.img`
  width: 150px;
  height: 150px;
`

export const ExchangeButton = styled.button`
  color: ${palette.text};
  background: ${palette.softBackground};
  padding: 8px 32px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  border-radius: 26px;
  transition: ${palette.tHover};

  &:hover {
    transform: scale(1.05);
  }
`