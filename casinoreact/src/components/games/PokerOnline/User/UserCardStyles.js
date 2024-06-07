import styled from "styled-components";

export const Container = styled.div`
	border-radius: 100%;
	position: absolute;
	background-color: ${(props) => props.bgColor2};
	box-shadow: 2px 0px 5px #000000;
	height: ${(props) => props.height};
	width: ${(props) => props.width};
	top: ${(props) => props.top};
	z-index: 10;
	left: ${(props) => props.left};
	display: flex;
	justify-content: center;
	&:before {
		content: "";
		border-radius: 50%;
		box-sizing: border-box;
		height: 100%;
		width: 100%;
		z-index: 11;
		position: absolute;
	}
	&:after {
		content: "";
		border-radius: 50%;
		height: 100%;
		width: 100%;
		z-index: 40;
		position: absolute;
		opacity: ${(props) => (props.background ? null : ".3")};
		background-color: ${(props) => (props.background ? null : "#000")};
	}
`;

export const ContainerScale = styled.div`
	border-radius: 100%;
	position: absolute;
	background-color: ${(props) => props.bgColor2};
	box-shadow: 2px 0px 5px #000000;
	height: ${(props) => props.height};
	width: ${(props) => props.width};
	top: ${(props) => props.top};
	z-index: 999;
	left: ${(props) => props.left};
	display: flex;
	justify-content: center;
	box-shadow: 1px 2px 14px rgba(0, 0, 0, 0.91);
	animation: shake 1.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) 12s both 6;
	@keyframes shake {
		10%,
		90% {
			transform: translate3d(-2px, 0, 0);
		}

		20%,
		80% {
			transform: translate3d(3px, 0, 0);
		}

		30%,
		50%,
		70% {
			transform: translate3d(-5px, 0, 0);
		}

		40%,
		60% {
			transform: translate3d(5px, 0, 0);
		}
	}
	&:before {
		content: "";
		border-radius: 50%;
		box-sizing: border-box;
		height: 100%;
		width: 100%;
		z-index: 11;
		position: absolute;
	}
	&:after {
		content: "";
		border-radius: 50%;
		height: 100%;
		width: 100%;
		z-index: 40;
		position: absolute;
		opacity: ${(props) => (props.background ? null : ".3")};
		background-color: ${(props) => (props.background ? null : "#000")};
	}
`;

export const Imagen = styled.div`
	height: ${(props) => props.imgH};
	width: ${(props) => props.imgW};
	margin: ${(props) => props.margin};
	border-radius: 100%;
	position: absolute;
	top: 5%;
`;

export const SecondContainer = styled.div`
	z-index: 3;
	position: absolute;
	border-radius: 5%;
	min-width: ${(props) => props.w};
	background-image: linear-gradient(
		to left,
		${(props) => props.bgFrom},
		${(props) => props.bgTo}
	);
	border: ${(props) => props.border};
	height: ${(props) => props.h};
	justify-content: center;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	display: flex;
	top: ${(props) => props.secondTop};
	left: ${(props) => props.secondLeft};
`;
export const SecondContainerScale = styled.div`
	transform: scale(1.1);
	z-index: 3;
	position: absolute;
	border-radius: 5%;
	width: ${(props) => props.w};
	background-image: linear-gradient(
		to left,
		${(props) => props.bgFrom},
		${(props) => props.bgTo}
	);
	border: 2px solid ${(props) => props.border};
	height: ${(props) => props.h};
	justify-content: center;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	display: flex;
	top: ${(props) => props.secondTop};
	left: ${(props) => props.secondLeft};
	animation: shake 1.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) 12s both 6;
	@keyframes shake {
		10%,
		90% {
			transform: translate3d(-2px, 0, 0);
		}

		20%,
		80% {
			transform: translate3d(3px, 0, 0);
		}

		30%,
		50%,
		70% {
			transform: translate3d(-5px, 0, 0);
		}

		40%,
		60% {
			transform: translate3d(5px, 0, 0);
		}
	}
`;
export const Li = styled.li`
	list-style: none;
`;
export const H3 = styled.h3`
	position: absolute;
	left: 50%;
`;
export const Head = styled.div`
	font-weight: 600;
	font-size: ${(props) => props.font};
	color: #ffffff;
	text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
export const Head2 = styled.div`
	font-weight: 500;
	color: ${(props) => props.colorSecond};
	font-size: 80%;
`;
