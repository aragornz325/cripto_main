import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 40%;
  padding: 0 2.5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  z-index: 10000;
  flex-wrap: wrap;
  bottom: 0%;
  z-index: 9999999999;
  @media(max-width: 650px){
    display: none;
  }
`

export const UiChip = styled.button`
  width: 15%;
  height: 45%;
  z-index: 10001;
  border: none;
  transition: .5s;
  position: relative;
  background: none;
  &:hover {
    transform: scale(1.12);
    // transform: rotate(360deg);
  }
`

export const Marker = styled.p`
  width: 70%;
  font-size: .8vw;
  color: white;
  position: absolute;
  top: -60%;
  left: 15%;
`

export const UiChipRenderer = styled.img`
  width: 100%;
  height: 100%;
  z-index: 10002;
  padding: 0;
  margin: 0;
  position: relative;
  cursor: pointer;
`

export const ChipDelete = styled.button`
  width: 30%;
  font-size: 3rem;
  border-radius: 4rem;
  background: black;
  color: white;
  &:hover {
    transform: scale(1.12);
    // transform: rotate(360deg);
  }
`