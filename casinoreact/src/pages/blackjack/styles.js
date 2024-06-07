import styled from "styled-components";
import * as palette from '../../utils/colors/palettes/default';

export const Bar = styled.div`
  width: 80%;
  position: absolute;
  left: 10%;
  bottom: 2%;
  display: flex;
  height: 15%;
  background: ${palette.background};
  border-radius: 4vw;
  z-index: 9999;
  border: #FFF solid .2vw;
`

export const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  width: 40%;
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 15%;
`

export const Username = styled.p`
  margin: 0;
  margin-bottom: .3vw;
  font-size: 1.25vw;
  color: #FFF;
  font-weight: 600;
`

export const Userbalance = styled.p`
  margin: 0;
  font-size: .9vw;
  color: ${palette.inputText};
  font-weight: 500;
`

export const UserPicture = styled.img`
  height: 90%;
  align-self: center;
`

export const Coins = styled.div`
  width: 40%;
  height: 100%;
`