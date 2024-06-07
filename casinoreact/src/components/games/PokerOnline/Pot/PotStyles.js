import styled from "styled-components";

export const Container = styled.section`
	width: 100%;
	justify-content: center;
	position: absolute;
	@keyframes scale {
		0% {
			transform: none;
		}
		100% {
			transform: scale(1.2);
		}
	}
	//animation: scale 2s backwards;
	//animation-delay: 7s;
	top: 25%;
`;
export const FirstChild = styled.div`
	display: flex;
	gap: 0.4%;
	width: 100%;
	justify-content: center;
`;
export const SecondChild = styled.div`
	border: 2px solid #ffd56a;
	border-radius: 20px 0px 0px 20px;
	box-shadow: 0 0 5px rgba(255, 146, 45, 0.2), 0 0 15px rgba(255, 146, 45, 0.2),
		0 0 30px rgba(255, 146, 45, 0.2), 0 0 50px rgba(255, 146, 45, 0.2);
	height: 8%;
	width: 4%;
	mix-blend-mode: hard-light;
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const ThirdChildren = styled.div`
	border: 1px solid;
	border-color: #fff;
	width: 9%;
	border-radius: 0px 20px 20px 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const PotH3 = styled.div`
	font-size: .8vw;
	font-weight: 700;
	text-align: center;
	color: #edd582;
	padding: 3px 0;
	text-shadow: 0px 3.14078px 3.14078px rgba(0, 0, 0, 0.66);
`;

export const PotH1 = styled.div`
	font-weight: 500;
	font-size: .8vw;

	color: #fff;
	text-align: center;
`;
