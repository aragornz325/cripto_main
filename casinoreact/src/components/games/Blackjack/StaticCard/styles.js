import styled from 'styled-components';

export const Image = styled.img`
  // transition: 5s;
  width: 7.5%;
  position: absolute;
  transition: .75s;
  top: 10%;
  left: 70%;
  transform: scaleX(0) scale(1.3);
  transition-timing-function: ease-in-out;
  @media (max-width: 650px){
    display: none;
  }
`