import styled from "styled-components";
import * as palette from "../../../utils/colors/palettes/default";

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: absolute;
	z-index: 9999999;
	left: 0.5%;
	top: 10%;
	width: 10%;
	height: 100%;
`;

export const Button = styled.button`
	background: ${palette.submitPink};
	border: none;
	font-size: min(18px, 1vw);
	font-weight: 500;
	padding: 3px;
	width: 100%;
	border-radius: 12px;
	margin-bottom: 12px;
`;

export const Output = styled.div`
	font-size: 24px;
	text-align: center;
	margin: 0;
	width: 100%;
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	gap: 8px;
`;
