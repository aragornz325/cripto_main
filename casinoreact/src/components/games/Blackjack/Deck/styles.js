import styled from 'styled-components';

export const Background = styled.img`
  width: 7.5%;
  position: absolute;
  top: 6%;
  left: 70%;
  z-index: 2;
  @media (max-width: 650px){
    display: none;
  }
`

export const Flipcard = styled.img`
  width: 7.5%;
  position: absolute;
  top: 6%;
  left: 70%;
  z-index: 3;
  transition: 0.3s;
  @media (max-width: 650px){
    display: none;
  }
`