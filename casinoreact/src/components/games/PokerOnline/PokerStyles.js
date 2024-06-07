import styled, { keyframes } from "styled-components";
import * as palette from "../../../utils/colors/palettes/default";

export const Main = styled.main`
	background: ${palette.tableBackground};
	height: calc(75vw * 9 / 16);
	width: 75vw;
	border-radius: 10px;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: auto;
	position: relative;
	transition: ${palette.tOpen};
`;

export const Content = styled.div`
	width: 100%;
	height: 100%;
`;
export const Children = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
`;
export const Buttons = styled.div`
	display: flex;
	position: absolute;
	justify-content: flex-end;
	align-items: center;
	bottom: 0;
	width: 100%;
`;

const rotateStar = keyframes`
	from {transform: rotate(0deg)}
	to {transform: rotate(360deg)}
`;
export const Winner = styled.div`
	display: none;
	flex-direction: column;
	align-items: center;
	// justify-content: center;
	position: absolute;
	padding-top: 20px;
	top : 55%;
	left: 25%;
	width: 50%;
	min-height: 20%;
	background: linear-gradient(
		270.06deg,
		rgba(217, 217, 217, 0) 0%,
		rgba(217, 217, 217, 0.90) 48.41%,
		rgba(217, 217, 217, 0) 100%
	);
	background-repeat: no-repeat;
	background-position: bottom;
	background-size: 90%;
	border-radius: 16px;
	z-index: 9999999999999999;
	// box-shadow: 0px 0px 10px 1000px rgba(0, 0, 0, 0.5);

	&.open {
		display: flex;
	}
`;
export const WinnerTitle = styled.div`
	position: absolute;
	top: -10%;
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
`;
export const WinnerTxt = styled.p`
	font-size: 1.8vw;
	font-family: 'Inter';
	font-weight: 900;
	letter-spacing: .05vw;
	margin: 0;
	// filter: drop-shadow(.3vw -.3vw .5vw ${palette.pokerWins});
	background: linear-gradient(93.08deg, #EDD582 1.46%, #B99208 112.04%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-fill-color: transparent;
`;

export const WinnerPlayer = styled.p`
	font-size: 1.4vw;
	font-family: 'Poppins';
	font-weight: 700;
	letter-spacing: .05vw;
	margin: 0;
`;

export const Turn = styled.p`
	position: absolute;
	margin: 0;
	bottom: 0.2%;
	left: 11%;
	font-size: 1.2vw;
	color: ${palette.text};
	margin: 0;
	font-weight: 500;
`;
export const NewRoundContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
`;
export const NewRoundText = styled.p`
	color: ${palette.pokerWins};
`;
export const NewRoundTimer = styled.div`
	color: ${palette.pokerWins};
	padding: 5px;
	border: 2px solid ${palette.pokerWins};
	border-radius: 50%;
`;

// FULL SCREEN
export const WinnerFullScreen = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 56%;
	left: 28%;
	bottom: 25%;
	width: 50%;
	height: 15%;
	background: linear-gradient(
		270.06deg,
		rgba(217, 217, 217, 0) -2.07%,
		rgba(217, 217, 217, 0.96) 48.41%,
		rgba(217, 217, 217, 0) 99.95%
	);
	border-radius: 16px;
	z-index: 9999999999999999;
`;

export const MainFullScreen = styled.main`
	background-image: url("../../../assets/backgroundPoker.jpg");
	background-size: cover;
	background-repeat: no-repeat;
	height: calc(100vw * 9 / 16);
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	z-index: 1000000000000000000000;
	transition: 1s;
`;
export const WrapperFullScreen = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: absolute;
	z-index: 9999999;
	left: 0.5%;
	top: 10%;
	width: 15%;
	padding-left: 10px;
	padding-right: 10px;
	height: 100vw;
`;
export const WinnerPlayeFullScreen = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	transform: translateY(-58%);
	svg {
		color: ${palette.pokerWins};
		font-size: 30px;
		animation: ${rotateStar} 8s linear infinite;
	}
`;
export const ContentFullScreen = styled.div`
	width: 90%;
	height: calc(76vw * 9 / 16);
	display: flex;
	padding-left: 100px;
	align-items: center;
	justify-content: center;
`;
export const ButtonsFullScreen = styled.div`
	display: flex;
	position: absolute;
	justify-content: flex-end;
	align-items: center;
	bottom: 50px;
	right: 30px;
`;
