import { combineReducers } from "redux";

const cellReducer = (state = [], action) => {
	switch (action.type) {
		case "ADD_CELL":
			return (state = [...state, action.data]);

		case "REMOVE_CELL":
			return (state = state.filter((x) => x !== action.data));

		default:
			return state;
	}
};

const stackReducer = (state = [], action) => {
	switch (action.type) {
		case "ADD_STACK":
			//console.log(state);

			let previous_stack = state.filter(
				(stack) => String(stack.ids) === String(action.data.ids)
			);

			let filter_repeated = state.filter(
				(stack) => String(stack.ids) !== String(action.data.ids)
			);

			//console.log(String(action.data.ids), state);

			if (previous_stack.length > 0) {
				return (state = [
					...filter_repeated,
					{
						...action.data,
						chips: [
							...previous_stack[0].chips,
							...action.data.chips,
						],
					},
				]);
			}

			return (state = [...filter_repeated, action.data]);

		case "REMOVE_STACK":
			return (state = []);

		default:
			return state;
	}
};

const chipReducer = (state = [], action) => {
	switch (action.type) {
		case "ADD_CHIP":
			return (state = [...state, action.data]);

		case "REMOVE_CHIP":
			return (state = state.filter((x) => x !== action.data));

		default:
			return state;
	}
};

export default combineReducers({
	cells: cellReducer,
	stacks: stackReducer,
	chips: chipReducer,
});
