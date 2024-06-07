import styled from "styled-components"
import * as palette from '../../../utils/colors/palettes/default';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4vh;
`

export const Container = styled.section`
  width: 100%;
  padding: 2vw;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  color: #FFF;
`

export const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 24px;
`

export const Picture = styled.img`
  width: 96px;
  border-radius: 12px;
  margin-right: 20px;
`

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 60%;
`

export const BtnSubmit = styled.button`
  font-size: 24px;
  border: none;
  border-radius: 10px;
  padding: 1px 24px;
  transition: .6s;
  margin: 3vh 0;
  font-weight: 700;
`

export const Title = styled.h1`
  font-size: 40px;
  margin: 0;
`

export const Email = styled.h3`
  margin: 0;
  font-size: 18px;
`

export const Coins = styled.div`
  width: 35%;
  display: flex;
  height: 25%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 24px;
`

export const Coin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 12px 24px;
`

export const CoinImg = styled.img`
  width: 64px;
  margin: 0;
`

export const CoinLabel = styled.p`
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  margin-top: 5px;
`

export const Table = styled.table` 
    display: flex;
    flex-direction: column;
    width: min(1000px, 80%);
    height: 100%;
    font-size: 16px;
    font-style: normal;
    font-weight: normal;
    color: #FFF;
`

export const THead = styled.thead` 
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid ${palette.sLightblue};
`


export const TBody = styled.tbody`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 600px;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0 4px;

    &::-webkit-scrollbar {
        -webkit-appearance: none;
    }

    &::-webkit-scrollbar:vertical {
        width: 3px;
    }

    &::-webkit-scrollbar-button:increment {
        display: none;
    } 

    &::-webkit-scrollbar-button {
        display: none;
    }

    &::-webkit-scrollbar-thumb {
        background: #797979;
        border-radius: 20px;
    }
    &::-webkit-scrollbar-track {
        margin-top: 0.38em;
    }

`

export const Vector = styled.img` 
    width: 0.75em;
    height: 0.75em;
    fill:solid;
    background: #CCC;
    padding: 4px;
    border: none;
    border-radius: 4px;

    @media screen and (max-width:414px) {
        font-size: 13px;
    }
`

export const Row = styled.tr` 
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    padding: 12px 0;

    &:first-child {
        margin-top: 7px;
    }
`

export const ColHead = styled.td` 
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-end;
    gap: 8px;
    align-items: center;
    width: calc(100% / 4);
    padding-bottom: 16px;
    font-weight: 500;
    font-size: 18px;
    color: ${palette.text};
`

export const HeadImg = styled.img`
  width: 32px;
  height: 32px;
`

export const Col = styled.td` 
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% / 4);
    color: ${props => !props.colored ? palette.text : props.status ? palette.sLightblue : palette.sPink};
    /* border: .5px solid ${palette.sLightblue}; */
    height: 100%;
  
    @media screen and (max-width:414px) {
        font-size: 13px;
    }

    @media screen and (max-width:300px) {
        font-size: 11px;
    }


    &:nth-child(1) {
        gap:7px;
    }
    &:nth-child(4) {
    }
`

export const TransferBtn = styled.button`
    color: #000;
    background: #FFF;
    border: none;
    border-radius: 6px;
    box-shadow: 0 0 4px rgba(0, 0, 0, .4);
    padding: 2px 6px;
`
export const NewOrder = styled.button`
  color: ${palette.text};
  font-size: 17px;
  font-weight: 700;
  padding: 10px 0;
  width: 150px;
  border: none;
  border-radius: 24px;
  transition: ${palette.tHover};
  cursor: pointer;
  background: linear-gradient(214.02deg, rgba(185, 54, 245, 0.55) 6.04%, #A83ECE 92.95%);

  &:hover{
    box-shadow: 0 0 4px ${palette.sDarkPink};
  }
`