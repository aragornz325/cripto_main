import styled from "styled-components";

export const Container = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	gap: 20px;
	margin: 1%;
`;

export const Elipse = styled.div`
	mix-blend-mode: hard-light;
	border: 3px solid #ffffff;
	border-radius: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 5vw;
	width: 5vw;
	cursor: pointer;
	z-index: 999;
	&:hover {
		transform: translateY(0.25rem);
		transform: scale(1.1);
		transition-duration: 0.1s;
	}
	&:active {
		background: linear-gradient(
			180deg,
			rgba(255, 228, 64, 0.35) 0%,
			rgba(175, 146, 41, 0.35) 100%
		);
		box-shadow: 5.14352e-16px 8.4px 16.8px rgba(46, 39, 11, 0.387),
			inset -2.08027e-16px -3.39733px 6px #4a3b06,
			inset 2.08027e-16px 3.39733px 3.39733px #fff043;
	}
`;
export const H3 = styled.h3`
	color: #fff;
	text-align: center;
	z-index: 999;
	font-weight: 500;
	font-size: 1vw;
	line-height: 19px;
	font-style: normal;
	text-shadow: 2px 1px 2px rgba(0, 0, 0, 0.82);
`;
export const ButtonTwo = styled.button`
	z-index: 999;
	background: none;
	border: none;
`;
export const ButtonTwoAll = styled.button`
	color: #000;
	cursor: pointer;

	background: radial-gradient(
		57.69% 198.98% at 57.69% 39.29%,
		#edd582 0%,
		#b99208 100%
	);
	box-shadow: inset -2px 0px 4px rgba(0, 0, 0, 0.25),
		inset 3px -2px 4px rgba(0, 0, 0, 0.25);
	backdrop-filter: blur(30px);
	border: 1px solid #b99208;
	padding: 10px 20px;
	border-radius: 32px;
`;
export const ButtonTwoFull = styled.button`
	border: 2px solid #8f52f5;
	margin-left: 20px;
	cursor: pointer;
	backdrop-filter: blur(38px);
	background: none;
	color: #8f52f5;
	padding: 10px 20px;
	border-radius: 32px;
	font-size: 1vw;
`;
export const ButtonTwoHalf = styled.button`
	border: 2px solid #00a8a8;
	color: #00a8a8;
	backdrop-filter: blur(38px);
	background: none;
	padding: 10px 20px;
	margin-left: 20px;
	cursor: pointer;
	border-radius: 32px;
`;
