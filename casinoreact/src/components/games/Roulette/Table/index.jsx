import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "./styles";
import Cell from "../Cell";

import { filterHovered } from "./handleInput";

import store from "../../../../store/reducers/store";
import Stack from "../Stack";
import { dif_dict, do_bet_if_possible } from "../../logic_asistant";

let { size, cells } = require("./TableTool/output.json");

const Table = (props) => {
	const [Stacks, setStacks] = useState([]);

	store.subscribe(() => {
		setStacks(store.getState().stacks);
	});

	const addIdentificator = (id, color, pos, ref) => {
		store.dispatch({
			type: "ADD_CELL",
			data: { id, color, pos, ref },
		});
	};

	const placeBet = (ids, position, selected_chips = props.getSelected()) => {
		const chips = props.getChips();

		//console.log("selected", selected_chips);

		do_bet_if_possible(chips, selected_chips, () => {
			//console.log("added stack");
			store.dispatch({
				type: "ADD_STACK",
				data: {
					ids,
					position,
					chips: selected_chips,
				},
			});
			props.refreshMenu();
			// props.setChips(dif_dict(chips, selected_chips));
		});
	};

	const setHovered = (ids, state) => {
		filterHovered(ids, state, store.getState().cells);
	};

	return (
		<Grid
			color_scheme={props.color_scheme}
			tabsize={size}
			style={props.style}
		>
			{cells.map((cell) => {
				return (
					<Cell
						id={cell.id}
						label={cell.label}
						style={cell.style}
						color_scheme={props.color_scheme}
						color_number={cell.color}
						size={cell.size}
						positions={cell.positions}
						activators={cell.inner_activators}
						placeBet={placeBet}
						key={cell.id}
						addIdentificator={addIdentificator}
						setHovered={setHovered}
					></Cell>
				);
			})}

			{Stacks.map((stack, index) => {
				return (
					<Stack
						style={{
							position: "absolute",
							top: 10 + stack.position.y * 20 + "%",
							left: 3.5714 + stack.position.x * 7.1428 + "%",
							zIndex: stack.position.y * 2,
						}}
						chips={stack.chips}
						key={String(stack.ids) + index}
					/>
				);
			})}
		</Grid>
	);
};

Table.propTypes = {
	color: PropTypes.string,
	mode: PropTypes.string,
};

Table.defaultProps = {
	distribution: [
		{ color: 1, id: "1" },
		{ color: 2, id: "10" },
		{ color: 3, id: "11" },
	],
};

export default Table;
