import styled from 'styled-components';

export const Wrapper = styled.img`
  width: 6%;
  position: absolute;
  z-index: 10;
  transform: scale(0);
  transition: 1s;
  cursor: pointer;
  @media (max-width: 650px){
    display: none;
  }
`

export const Info = styled.p`
  position: absolute;
  color: white;
  text-align: center;
  width: 15%;
  z-index: 10;
  font-size: 1.5vw;
  @media (max-width: 650px){
    display: none;
  }
`