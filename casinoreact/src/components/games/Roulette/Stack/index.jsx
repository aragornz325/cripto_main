import React from "react";
import { StyledStack, StyledTotal } from "./style";
import Chip from "../Chip";

const Stack = (props) => {
	let located_chips = [];

	let chips = props.chips;

	//console.log(chips);

	let total = 0;
	let candidates = [1, 5, 10, 25, 50, 100, 500, 1000];

	for (let chip in chips) {
		total += chip * chips[chip];
	}

	let u_total = total;

	let new_chips = [];

	for (let i = candidates.length - 1; i > -1; i--) {
		while (total >= candidates[i]) {
			new_chips.push(candidates[i]);
			total -= candidates[i];
		}
	}

	for (let i = 0; i < new_chips.length; i++) {
		located_chips.push(<Chip value={new_chips[i]} position={i} key={i} />);
	}

	return (
		<StyledStack style={props.style}>
			{located_chips.map((chip) => {
				return chip;
			})}
			{/*<StyledTotal>{u_total}</StyledTotal>*/}
		</StyledStack>
	);
};

export default Stack;
