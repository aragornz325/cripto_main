import styled from "styled-components";
import * as palette from '../../../../../utils/colors/palettes/default';

export const Container = styled.div`
	position: absolute;
	width: 90%;
	margin: 0px 5% 10% 5%;
	background: rgba(3, 5, 33, 0.74);
	border: 2px solid #ffffff;
	/* box-shadow: inset 10px 10px 17px rgba(166, 166, 166, 0.25); */
	backdrop-filter: blur(25px);
	height: 5.5vw;
	border-radius: 50px;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	z-index: 200000;
	`;
	export const Buttons = styled.div`
	display: flex;
	width: 25vw;
	justify-content: space-evenly;
	width: 50%;
`;
export const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	border: .15vw solid ${props => props.disabled ? "#fff" : props.color};
	border-radius: 100%;
	height: 4vw;
	width: 4vw;
	color: ${props => props.disabled ? "#fff" : props.color};
	z-index: 999;
	font-size: .8vw;
	font-weight: 700;
	background: none;
	cursor: ${props => props.disabled ? "default" : "pointer"};;
	transition: 1s;
	opacity: ${props => props.disabled ? .5 : 1};

	${props => props.text === "Call" && !props.disabled && props.price ? ` &::before {
		content: "${props.price >= props.roomBalance ? props.roomBalance : props.price }";
		background: ${props.color};
		padding-left: 5px;
		padding-right: 5px;
		border-bottom-left-radius: 100px;
        border-top-left-radius: 100px;
		border-bottom-right-radius: 100px;
        border-top-right-radius: 100px;
		position: absolute;
		transform: translateY(-300%);
		border: .15vw solid ${props.color};
		box-shadow: 0px 0px 15px ${props.color}};
		font-size: .9vw;
	}
	` : null}

	&::before {
		color: #000;
	}
	
	&:hover {
		background: ${props => !props.disabled && props.color};
		box-shadow: ${props => props.disabled ? "none" : `0px 0px 15px ${props.color}`};
		font-size: ${props => !props.disabled && '.9vw'};
		color: ${props => props.disabled ? "#fff" : "#000"};	
	}
	`;


export const ContainerRaise = styled.div`
	display: flex;
	align-items: center;
	width: 50%;
	padding: 0 1%;
	filter: ${props => !props.disabled ? "none" : "grayscale(100%)"}; 
`;
export const ButtonsRaise = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: .6vw;
	filter: ${props => props.raiseActions ? `grayscale(100%)` : null }
`;
export const Bet = styled.div`
	display: flex;
	justify-content: space-evenly;
	width: 28vw;
	gap: .6vw;
`;
export const AllIn = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 2vw;
	width: 6vw;
	border-radius: 27.0278px;
	border: none;
	background: linear-gradient(93.08deg, #f474e1 1.46%, #bb00bf 112.04%);
	box-shadow: inset -1.70909px 0px 11.1091px rgba(0, 0, 0, 0.25),
		inset 2.56364px -1.70909px 8.54545px rgba(0, 0, 0, 0.25);
	backdrop-filter: blur(25.6364px);
	font-size: 1vw;
	cursor: ${({disabled}) => disabled ? '' : 'pointer' };
`;
export const HalfPot = styled.button`
	background: none;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 2vw;
	width: 6vw;
	border-radius: 27.0278px;
	border: 2px solid #8ffff1;
	backdrop-filter: blur(32.4727px);
	font-size: 1vw;
	cursor: ${({disabled}) =>  disabled ? '' : 'pointer' };
`;
export const FullPot = styled.button`
	background: none;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 2vw;
	width: 6vw;
	border-radius: 27.0278px;
	border: 2px solid #dda7ff;
	backdrop-filter: blur(32.4727px);
	font-size: 1vw;
	cursor: ${({disabled}) => disabled ? '' : 'pointer' };
`;
export const RaiseTo = styled.div`
	display: flex;
	justify-content: space-evenly;
	width: 29vw;
	height: 1.8vw;
	align-items: center;
	background: #0b1e3e;
	border-radius: 32.0871px;
	cursor: ${({disabled}) => disabled ? '' : 'pointer' };
`;
export const CircleCheck = styled.button`
	border-radius: 50%;
	height: 3vw;
	width: 3vw;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	border: ${props => props.disabled && 'solid white .1vw'};
	background: ${props => props.disabled ? 'none' : 'linear-gradient(93.08deg, #a602a7 1.46%, #fe17ff 112.04%)'};
	filter: ${props => props.raiseActions ? `grayscale(100%)` : null };
	cursor: ${({disabled}) => disabled ? '' : 'pointer' };
`;
export const H3 = styled.h3`
	font-weight: 500;
	color: #c9c9ca;
	font-size: .8vw;
	margin: .6vw .1vw .6vw  .9vw;
`;
export const Input = styled.input`
	background: none;
	color: #fff;
	border: none;
	font-size: .9vw;
	width: 2.5vw;
`;

export const ButtonLess = styled.button`
	background: rgba(254, 23, 255, 0.5);
	border-radius: 50%;
	padding: .3vw;
	display: flex;
	margin-right: .8vw;
	border: 0.611125px solid #fe17ff;
	box-shadow: 0.611125px 1.22225px 2.4445px rgba(0, 0, 0, 0.91);
	font-size: 1vw;
`;
export const ButtonMore = styled.button`
	display: flex;
	margin-left: .8vw;
	background: rgba(254, 23, 255, 0.5);
	border-radius: 50%;
	padding: .3vw;
	border: 0.611125px solid #fe17ff;
	box-shadow: 0.611125px 1.22225px 2.4445px rgba(0, 0, 0, 0.91);
`;

export const UserInfoBox = styled.div`
	width: 20vw;
	height: 100%;
	display: flex;
	gap: .5vw;
	align-items: center;
`

export const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

export const UserName = styled.p`
	margin: 0;
	font-size: 1.2vw;
	font-weight: 700;
`

export const UserBalance = styled.p`
	margin: 0;
	font-size: .9vw;
	font-weight: 500;
	color: ${palette.inputText};
`

export const UserPicture = styled.img`
	height: 90%;
	width: 90%;
	border-radius: 50%;
	position: absolute;
	top: 5%;
	right: 5%;
`

export const UserPictureBox = styled.div`
	height: 7vw;
	width: 7vw;
	justify-content: center;
	align-items: center;
	position: relative;
	border-radius: 50%;
	overflow: visible;
	box-shadow: ${props => props.turn && '0 0 .8vw rgba(255, 255, 255, .7)'};
`