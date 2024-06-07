import styled from "styled-components";

export const StyledStack = styled.div`
	top: 50%;
	left: 50%;
	pointer-events: none;
	position: absolute;

	&.hovered {
		opacity: 0.5;
	}
`;

export const StyledTotal = styled.div`
	//color: transparent;
	//text-shadow: none;

	//background-color: #000000b7;

	position: absolute;
	width: 4vmin;
	top: -2vmin;
	left: -2vmin;

	border-radius: 10px;

	font-size: 3vmin;

	z-index: 69;

	//&:hover {
	color: white;
	text-shadow: 0 0 10px black;
	//}
`;
