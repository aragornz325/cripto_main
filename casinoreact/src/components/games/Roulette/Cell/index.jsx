import React, { useEffect, useRef } from 'react';
import PropTypes from "prop-types";

import { StyledCell, Activator, CellBackground } from "./styles";


const Cell = (props) => {
	const ref = useRef({});

	useEffect(() => {
		const a_ref = ref.current;
		props.addIdentificator(
			props.id,
			props.color_number,
			props.positions[0],
			a_ref
		);
	}, []);

	let cellCenter = {
		x: props.positions[0][0] - 0.5 + props.size[0] / 2,
		y: props.positions[0][1] - 0.5 + props.size[1] / 2,
	};

	return (
		<StyledCell
			color_scheme={props.color_scheme}
			color_number={props.color_number}
			style={props.style}
			size={props.size}
			className={props.class}
			ref={ref}
		>
			{/* <CellBackground
				color_scheme={props.color_scheme}
				color_number={props.color_number}
			/> */}
			<div
				className="inner_grid"
				style={{ width: "100%", height: "100%" }}
			>
				<Activator
					style={{
						gridColumnStart: 2,
						gridColumnEnd: 2 + props.size[0] * 4 - 2,
						gridRowStart: 2,
						gridRowEnd: 2 + props.size[1] * 4 - 2,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
					onClick={() => {
						props.placeBet([props.id], cellCenter);
					}}
					onMouseEnter={() => {
						props.setHovered([props.id], true);
					}}
					onMouseLeave={() => {
						props.setHovered([props.id], false);
					}}
				>
					{props.label}
				</Activator>
				{props.activators.map((activator) => {
					let startx =
						4 * activator.fromStart.x +
						Math.max((activator.rear.x + 1) * 2, 1);
					let starty =
						4 * activator.fromStart.y +
						Math.max((activator.rear.y + 1) * 2, 1);

					let position = {
						x: props.positions[0][0] + activator.fromStart.x,
						y: props.positions[0][1] + activator.fromStart.y,
					};

					let direction = {
						x: activator.rear.x,
						y: activator.rear.y,
					};

					let finalPos = {
						x: position.x + direction.x / 2,
						y: position.y + direction.y / 2,
					};

					return (
						<Activator
							style={{
								gridColumnStart: startx,
								gridColumnEnd: startx + activator.buttonSize.x,
								gridRowStart: starty,
								gridRowEnd: starty + activator.buttonSize.y,

								fontSize: "0.5vmin",
							}}
							key={
								"activator-" +
								props.id +
								"-" +
								activator.rear.x +
								"-" +
								activator.rear.y +
								"-" +
								activator.fromStart.x +
								"-" +
								activator.fromStart.y +
								"*" +
								activator.ids.map((id) => {
									return "-" + id;
								})
							}
							onClick={() => {
								if (activator.ids.length > 1) {
									props.placeBet(activator.ids, finalPos);
								} else {
									props.placeBet(activator.ids, cellCenter);
								}
							}}
							onMouseEnter={() => {
								props.setHovered(activator.ids, true);
							}}
							onMouseLeave={() => {
								props.setHovered(activator.ids, false);
							}}
						></Activator>
					);
				})}
			</div>
		</StyledCell>
	);
};

Cell.propTypes = {
	mode: PropTypes.string,
};

export default Cell;
