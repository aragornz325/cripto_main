import styled from "styled-components";
import * as palette from '../../../utils/colors/palettes/default';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: ${palette.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

export const WrapperImg = styled.img`
  width: 100%;
  position: absolute;
  /* object-fit: fill; */
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

export const Text = styled.p`
  max-width: 90%;
  font-size: 8vw;
  color: ${palette.text};
  text-align: center;
  margin: 0vw;
`

export const SubText = styled.p`
  max-width: 90%;
  font-size: 6vw;
  color: ${palette.text};
  text-align: center;
  margin: 2vw 0 6vw 0;
`

export const Icons = styled.div`
  display: flex;
  gap: 5vw;
`

export const Icon = styled.img`
  border-radius: 50%;
  width: 12vw;
`