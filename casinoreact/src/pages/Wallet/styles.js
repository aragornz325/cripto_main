import styled from "styled-components";
import * as palette from '../../utils/colors/palettes/default';

export const Wrapper = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  border-radius: 40px;
  margin: 2rem auto;
  background: linear-gradient(180deg, rgba(18, 22, 94, 0.8) 0%, rgba(1, 126, 153, 0) 100%);
`

export const TitleContainer = styled.div`
  .titleWrap{
    display: flex;
    align-items: center;
  }
  position: relative;
  gap: 16px;
  margin-top: 24px;

`

export const TitleIcon = styled.img`
  width: 36px;
  height: 36px;
`

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 600;
  color: ${palette.activeText};
  margin: 0;
  margin-left: 10px;

  img{
    cursor: pointer;
    user-select: none;
    &.active {
      transform: rotate(180deg);
    }
  }
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

export const Coin = styled.img`
  width: 32px;
  height: 32px;
`

export const Balance = styled.p`
  font-size: 32px;
  color: ${palette.sLightblue};
  font-weight: 500;
  margin: 0;
`

export const Selector = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  width: min(80%, 850px);
`

export const Option = styled.button`
  color: ${palette.text};
  font-size: 17px;
  font-weight: ${props => props.selected ? 700 : 500};;
  padding: 10px 0;
  width: 150px;
  background: ${props => props.selected ? palette.submitPurple : palette.softBackground};
  border: none;
  border-radius: 24px;
  transition: ${palette.tHover};
  cursor: pointer;

  &:hover{
    box-shadow: 0 0 4px ${palette.sDarkPink};
  }
`
export const Wallet = styled.div`
  padding: 16px 0;
  position: absolute;
  top: 77px;
  left: 0;
  top: 1rem;
  background: #233769;
  border: 1px solid rgba(143, 255, 241, 0.56);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 2rem;
  width: 15rem;
  z-index: 10;
  
  p.title {
    padding: 1rem 0;
    margin: 0;
    font-size: 1.6rem;
    color: #EAA6FA;
  }
  p.item {
    color: #C571D8;
    font-size: 16px;
    font-weight: 300;
    border-top: 1px solid #C571D8;
    border-bottom: 1px solid #C571D8;
    width: 100%;
    text-align: center;
    padding: 1rem 0;
    margin: 0;
    cursor: pointer;
  }
  button {
    border: 0;
    cursor: pointer;
    padding: .7rem 1.7rem;
    border-radius: 100px;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.1);
    margin-top: 1rem;
    color: #8FFFF1;
  }
`