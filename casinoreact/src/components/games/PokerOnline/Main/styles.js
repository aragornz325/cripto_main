import styled from "styled-components";

export const Buttons = styled.div`
	display: flex;
	position: absolute;
	justify-content: flex-end;
	align-items: center;
	bottom: 0;
	width: 100%;
`;

export const GameView = styled.div`
	width: ${props => `${props.size}vw`};
	height: ${props => `calc(${props.size}vw * 9 / 16)`};
	position: relative;
	margin-top: 4px;
	border-radius: .6vw;
	overflow: hidden;
	align-self: center;
	border: 2px solid darkblue;
`

export const TableImg = styled.img`
	position: absolute;
	width: 90%;
	height: 75%;
	top: 10%;
`

export const OwnPlayerCards = styled.img`
	position: absolute;
	width: 9%;
	bottom: 10%;
	left: ${props => `calc(${props.index}% * 4 + 40%)`};
`

export const PlayerInfo = styled.div`
	min-width: 5.5vw;
  height: 3.2vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(0.25turn, rgba(255, 255, 255, 0), #D869CF 55%);
  border: 0.12vw solid #D869CF;
  border-top-right-radius: 0.5vw;
  border-bottom-right-radius: 0.5vw;
  padding-left: 3vw;
  margin-left: -2.5vw;
  padding-right: 1vw;
  z-index: 1;
`

export const PlayerName = styled.p`
	font-size: 1vw;
	font-weight: 600;
	margin: 0;
`

export const PlayerBalance = styled.p`
	margin: 0;
	font-size: .9vw;
`

export const PlayerImg = styled.img`
	width: 4.5vw;
  height: 4.5vw;
  border-radius: 50%;
  border: .3vw solid #D869CF;
  box-shadow: 0 0 0.8vw #D869CF;
  z-index: 2;
`

export const Dealer = styled.img`
	position: absolute;
	top: 0;
	left: 46%;
	width: 8%;
`

export const Pot = styled.div`
	display: flex;
	position: absolute;
	top: 24%;
`