// import React from "react";
// import store from "../../../../store/reducers/store";
// import Chip from "../Chip";

// const ChipSelector = (props) => {
// 	let menu = [];

// 	store.subscribe(() => {});

// 	const setMenu = async () => {
// 		const coins = await props.getCoins();

// 		menu = Object.keys(coins).filter((key) => coins[key] > 0);
// 	};

// 	const moveSelector = (action) => {
// 		switch (action) {
// 			case "INCREMENT":
// 				props.setSelected(props.setSelected);
// 				break;
// 			case "DECREMENT":
// 				props.setSelected(props.setSelected);
// 				break;
// 		}
// 	};

// 	return (
// 		<div>
// 			<div style={buttonStyle}>-</div>
// 			<Chip />
// 			<div style={buttonStyle}>+</div>
// 		</div>
// 	);
// };

// export default ChipSelector;
