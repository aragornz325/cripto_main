import React from "react";

const Chip = (props) => {
	return (
		<img
			src={`assets/fichas/f${props.value}.png`}
			style={{
				width: "2vw",
				position: "absolute",
				top: -1 + -props.position * 0.2 + "vw",
				left: "-1vw",
				pointerEvents: null,
			}}
		></img>
	);
};

export default Chip;
