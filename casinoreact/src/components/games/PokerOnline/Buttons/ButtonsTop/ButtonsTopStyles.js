import styled from "styled-components";

export const Container = styled.section`
	display: flex;
`;

export const Content = styled.div`
	cursor: pointer;
	display: flex;
	z-index: 10;
	height: 100%;
	width: 100%;
	position: absolute;
	top: 5%;
	right: 5%;
	align-items: start;
	justify-content: end;
	gap: 2rem; /* 32px */
`;

export const Button = styled.div`
	background-color: none;
	position: absolute;
	z-index: 999;
	cursor: pointer;
	top: 5%;
	left: 5%;
`;
