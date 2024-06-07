import styled from "styled-components";
import { color_schemes } from "../colors";

export const StyledCell = styled.div`
	color: ${(props) => {
		return color_schemes[props.color_scheme].border;
	}};

	user-select: none;

	font-weight: bold;

	border: none;

	aspect-ratio: ${(props) => {
		return props.size[0] / props.size[1];
	}};

	box-shadow: 0px 0px 0px 1px white inset;

	position: relative;

	& > .inner_grid {
		display: grid;
		grid-template-columns: repeat(
			${(props) => props.size[0] * 4},
			minmax(0, 1fr)
		);
		grid-template-rows: repeat(
			${(props) => props.size[1] * 4},
			minmax(0, 1fr)
		);
	}

	&.hovered {
		background-color: green;
	}
	position: relative;
	overflow: hidden;

	background-color: ${(props) => {
		return color_schemes[props.color_scheme][props.color_number];
	}};
`;

export const CellBackground = styled.div`
	position: absolute;
	top: 1px;
	left: 1px;
	width: calc(100% - 2px);
	height: calc(100% - 2px);
	opacity: 0.63;
	background-color: ${(props) => {
		return color_schemes[props.color_scheme][props.color_number];
	}};
`;

CellBackground.defaultProps = {
	color_scheme: "classic",
	color_number: 1,
};

StyledCell.defaultProps = {
	color_scheme: "classic",
	color_number: 1,
	sizex: 2,
	sizey: 2,
};

export const Activator = styled.div`
	cursor: pointer;
	position: relative;
	font-family: "Times New Roman";
	font-size: 1.15vw;
	font-weight: 600;
`;
