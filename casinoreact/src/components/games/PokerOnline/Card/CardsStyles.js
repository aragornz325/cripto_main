import styled from "styled-components";

export const Flex = styled.div`
	display: flex;
`;

export const Img = styled.img`
	z-index: 2;
	position: absolute;
	top: ${(props) => props.secondTop};
	left: ${(props) => props.secondLeft};
	transform: rotateY(360deg);
	transition: 4s ease-in all;
	width: ${(props) => props.w}; //3.5%;
	height: ${(props) => props.h}; //12%;
`;
export const SecondImg = styled.img`
	animation: reparto 2s forwards;
	z-index: 2;
	position: absolute;
	width: ${(props) => props.w}; //4.5%;
	height: ${(props) => props.h}; //14%;
	top: ${(props) => props.top};
	left: ${(props) => props.left};
	@keyframes reparto {
		0% {
			top: ${(props) => props.secondTop};
			left: ${(props) => props.secondLeft};
		}
		100% {
			transition: 4s ease-in all;
		}
	}
`;
