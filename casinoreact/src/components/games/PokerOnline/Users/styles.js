import styled from "styled-components";
import * as palette from '../../../../utils/colors/palettes/default';

export const UserCardContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  z-index: 2;
`

export const UserIcon = styled.img`
  width: 4vw;
  height: 4vw;
  border-radius: 50%;
  border: .3vw solid ${props => props.color};
  z-index: 2;
  box-shadow: ${props => props.active && '0 0 .8vw ' + props.color};
  transform: ${props => props.active && 'scale(1.25)'};
`

export const UserInfoBox = styled.div`
  background: ${props => 'linear-gradient(.25turn, rgba(255, 255, 255, 0), ' + props.color + ' 55%)'};
  border: .12vw solid ${props => props.color};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 8vw;
  height: 3.6vw;
  border-top-right-radius: .5vw;
  border-bottom-right-radius: .5vw;
  padding-left: 1vw;
  margin-left: -1vw;
  z-index: 1;
`

export const UserName = styled.p`
  margin: 0;
  font-size: 1vw;
  font-weight: 600;
`

export const UserBalance = styled.p`
  margin: 0;
  font-size: .8vw;
  font-weight: 500;
`