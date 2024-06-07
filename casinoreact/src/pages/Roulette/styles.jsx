import styled, { keyframes } from "styled-components";
import * as palette from '../../utils/colors/palettes/default';

export const RouletteGameContainer = styled.div`
	display: flex;
	position: absolute;
`;

export const InputContainer = styled.div`
	display: flex;
`;

export const CoinBetContainer = styled.div`
	display: flex;
`;

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 90px;
`;

export const Buttons = styled.div`
	display: flex;
	position: absolute;
	align-items: center;
	bottom: 0;
	width: 100%;
`;

let deg = 0;

deg = Math.floor(4000 + Math.random()*4000)

const actualDeg = deg%360;

console.log('actualDeg', actualDeg)

export const TheRoulette = styled.img`
position: absolute;
top: 10%;
left: 3%;
width: 40%;
height: 70%;
-webkit-animation:spin 5s linear infinite;
-moz-animation:spin 5s linear infinite;
animation:spin 5s linear infinite;
filter: blur(0);

${props => props.Spin && `
	transition: all 10s ease;
	transform: rotate(${props.degrees});
`}
`;

export const FullScreen = styled.button`
	font-size: 1.5vw;
	border-radius: 0.7vw;
	background-color: transparent;
	border: none;
	display: flex;
	padding: 0.3vw;
	align-items: center;
	justify-content: center;
	transition: 0.5s;

	&:hover {
		opacity: .3;
	}
	@media (max-width: 650px) {
		display: none;
	}
`;

export const SoundIcon = styled.button`
	font-size: 1.5vw;
	border-radius: 0.7vw;
	background-color: transparent;
	border: none;
	display: flex;
	padding: 0.3vw;
	align-items: center;
	justify-content: center;
	transition: 0.5s;
`

export const WinnerContainer = styled.div
   ` position: absolute;
    top: 10%;
    left: 3%;
    width: 40%;
    height: 70%;
    zIndex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
	
	`


export const WinnerCircle = styled.div
   ` height: 40%;
    width: 40%;
    border-radius: 50%;
    border: 4px solid #fff;
    display: flex;
    justify-content: center;
	opacity: .9;
    align-items: center;
    box-shadow: 0px 0px 60px 60px #8FFFF1;
	`


export const WinnerContent = styled.div
   ` background-color: rgba(143, 255, 241, 0.21);
    height: 100%;
    width: 100%;
    border-radius: 50%;
    box-shadow: inset 0px 0px 50px 10px #8FFFF1;
    display: flex;
    justify-content: center;
    align-items: center;`


export const WinnerNumber = styled.h1
  `  color: #fff;
    font-size: 5vw;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    line-height: 155px;`
	
export const RouletteBall = styled.div`
	position: absolute;
	top: 25.5%;
	left: 22.5%;
	z-index: 1;
	width: 15px;
	height: 15px;
	border-radius: 50%; 
  	background: 
    radial-gradient(
      circle at 30% 30%,
      #FFFFFF,
      #774400
    );
`

export const ResultModal = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	// justify-content: center;
	position: absolute;
	padding-top: 20px;
	top : 55%;
	left: 25%;
	width: 75%;
	min-height: 20%;
	background: linear-gradient(
		270.06deg,
		rgba(217, 217, 217, 0) 0%,
		rgba(217, 217, 217, 0.65) 48.41%,
		rgba(217, 217, 217, 0) 100%
	);
	background-repeat: no-repeat;
	background-position: bottom;
	background-size: 90%;
	border-radius: 16px;
	z-index: 9999999999999999;
`
const rotateStar = keyframes`
	from {transform: rotate(0deg)}
	to {transform: rotate(360deg)}
`;

export const WinnerAmount = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: .5vw;
	margin: 0;

	svg {
		color: ${palette.pokerWins};
		font-size: 1.2vw;
		animation: ${rotateStar} 8s linear infinite;
	}
`