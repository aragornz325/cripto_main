import styled from "styled-components";
import * as palette from '../utils/colors/palettes/default';

export const GameView = styled.div`
	width: 70vw;
	height: calc(70vw / 16 * 9);
	position: relative;
	align-self: center;
	z-index: 1;
	margin-top: 4vw;
`;

export const FullScreen = styled.button`
	position: absolute;
	left: 5%;
	bottom: 1.5%;
	z-index: 2;
	font-size: 1.5vw;
	background: none;
	border-radius: 0.7vw;
	border: none;
	display: flex;
	padding: 0.3vw;
	align-items: center;
	justify-content: center;
	opacity: 0.3;
	transition: 0.5s;

	&:hover {
		opacity: 1;
	}
	@media (max-width: 650px) {
		display: none;
	}
`;
