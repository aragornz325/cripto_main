import styled from "styled-components";

export const Grid = styled.div`
	display: grid;
	grid-gap: 0px;
	position: relative;

	width: auto;
	height: auto;

	grid-template-columns: repeat(
		${(props) => {
			return props.tabsize.x;
		}},
		minmax(0, 1fr)
	);
	grid-template-rows: repeat(
		${(props) => {
			return props.tabsize.y;
		}},
		minmax(0, 1fr)
	);
`;
