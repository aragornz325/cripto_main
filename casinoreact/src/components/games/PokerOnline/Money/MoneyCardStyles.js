import styled from "styled-components";

export const ContainerDos = styled.div`
	display: flex;
	position: absolute;
	align-items: center;
	justify-content: center;
	left: 29%;
	top: 45%;
	opacity: 1;
	animation: ContainerDos 1s forwards;
	@keyframes ContainerDos {
		from {
			transform: translate(-150px, 0);
		}
		to {
			transform: translate(0);
		}
	}
`;
export const Container = styled.div`
	display: flex;
	position: absolute;
	align-items: center;
	justify-content: center;
	left: ${props => props.left};
	top: ${props => props.top};
	opacity: 1;
	z-index: 3;
	animation: Container 1s forwards;
	@keyframes Container {
		from {
			transform: translate(0, 180px);
		}
		to {
			transform: translate(0);
		}
	}
`;
export const ContainerTres = styled.div`
	display: flex;
	position: absolute;
	align-items: center;
	justify-content: center;
	left: 66%;
	top: 45%;
	opacity: 1;
	animation: ContainerTres 1s forwards;
	@keyframes ContainerTres {
		from {
			transform: translate(150px, 0);
		}
		to {
			transform: translate(0);
		}
	}
`;
export const ContainerCuatro = styled.div`
	display: flex;
	position: absolute;
	align-items: center;
	justify-content: center;
	left: 41%;
	top: 18%;
	opacity: 1;
	animation: ContainerCuatro 1s forwards;
	@keyframes ContainerCuatro {
		from {
			transform: translate(0, -120px);
		}
		to {
			transform: translate(0);
		}
	}
`;
export const ContainerCinco = styled.div`
	display: flex;
	position: absolute;
	align-items: center;
	justify-content: center;
	left: 54.5%;
	top: 18%;
	opacity: 1;
	animation: ContainerCinco 1s forwards;
	@keyframes ContainerCinco {
		from {
			transform: translate(50px, -120px);
		}
		to {
			transform: translate(0);
		}
	}
`;
export const Imagen = styled.img`
	z-index: 10;
	width: 1.5vw;
	height: 1.5vw;
	border-radius: 50%;
	margin: .5vw .5vw 0 0;
	//animation: animationPOT 1s linear 6.5s;
	@keyframes animationPOT {
		0% {
			transform: translate(0);
		}
		100% {
			opacity: 0;
			transform: translate(50px, -150px);
		}
	}
`;

export const Imagen2 = styled.div`
	z-index: 10;
	background-color: #ffab2d;
	border-radius: 100%;
	height: 1.5rem;
	animation: animationPOT2 1s linear 6.5s;
	@keyframes animationPOT2 {
		0% {
			transform: translate(0);
		}
		100% {
			opacity: 0;
			transform: translate(270px, -80px);
		}
	}
`;
export const Imagen3 = styled.div`
	z-index: 10;
	background-color: #ffab2d;
	border-radius: 100%;
	height: 1.5rem;
	animation: animationPOT3 1s linear 6.5s;
	@keyframes animationPOT3 {
		0% {
			transform: translate(0);
		}
		100% {
			opacity: 0;
			transform: translate(-165px, -80px);
		}
	}
`;
export const Imagen4 = styled.div`
	z-index: 10;
	background-color: #ffab2d;
	border-radius: 100%;
	height: 1.5rem;
	animation: animationPOT4 1s linear 6.5s;
	@keyframes animationPOT4 {
		0% {
			transform: translate(0);
		}
		100% {
			opacity: 0;
			transform: translate(225px, 15px);
		}
	}
`;
export const Imagen5 = styled.div`
	z-index: 10;
	background-color: #ffab2d;
	border-radius: 100%;
	height: 1.5rem;
	animation: animationPOT5 1s linear 6.5s;
	@keyframes animationPOT5 {
		0% {
			transform: translate(0);
		}
		100% {
			opacity: 0;
			transform: translate(-100px, 15px);
		}
	}
`;
export const ContainerImagen = styled.div`
	border: .1vw solid;
	border-color: ${props => props.borderColor};
	border-radius: .6vw .6vw .6vw 0;
	margin-top: .6vw;
	position: absolute;
	display: flex;
	justify-content: end;
	left: calc(50%);
`;
export const H5 = styled.div`
	color: #fff;
	padding: 0 .3vw 0 .7vw;
	font-size: .8vw;
	line-height: 1.2vw;
`;
