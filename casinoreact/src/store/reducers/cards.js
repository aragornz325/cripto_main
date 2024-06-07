const cardReducer = (
	state = {
		cards: [[], [], []],
		bet: [0, 0, 0],
		gameState: "none",
		alert: {
			display: false,
			text: "",
			color: "none",
		},
		games: [false, false, false],
		gameIndex: [],
		drawCard: false,
		volume: 0.1,
		username: "",
		cells: [],
		stacks: [],
		chips: [],
		feedback: true
	},
	action
) => {
	switch (action.type) {
		case "flipCard":
			if (state.cards.length > 0) {
				state.cards.map((card) => {
					if (card.index === action.payload.index) {
						card.flipped = true;
					}
					return card;
				});
				return {
					...state,
				};
			} else {
				return {
					...state,
				};
			}

		case "addCard":
			let newCards = [...state.cards];
			newCards[action.payload.index].push({
				...action.payload.info,
				flipped: true,
			});
			return {
				...state,
				cards: newCards,
			};

		case "resetCard":
			return {
				...state,
				cards: [[], [], []],
			};

		case "setCards":
			return {
				...state,
				cards: action.payload.cards,
			};

		case "addBet":
			let newBet = state.bet;
			newBet[action.payload.index] += action.payload.amount;
			return {
				...state,
				bet: newBet,
			};

		case "setBetChips":
			return {
				...state,
				BJchips: action.payload.chips,
			};

		case "setGameState":
			return {
				...state,
				gameState: action.payload.state,
			};

		case "setAlert":
			return {
				...state,
				alert: {
					display: action.payload.display,
					text: action.payload.text,
					color: action.payload.color,
				},
			};

		case "setGames":
			return {
				...state,
				games: action.payload.games,
			};

		case "setGameIndex":
			return {
				...state,
				gameIndex: action.payload.index,
			};

		case "drawCard":
			return {
				...state,
				drawCard: action.payload.status,
			};

		case "setVolume":
			return {
				...state,
				volume: action.payload.volume,
			};

		case "setUsername":
			return {
				...state,
				username: action.payload.username,
			};

		case "resetBetChips":
			return {
				...state,
				BJchips: [
					{
						one: 0,
						five: 0,
						ten: 0,
						twentyfive: 0,
						fifty: 0,
						hundred: 0,
						twohundred: 0,
						fivehundred: 0,
						thousand: 0,
					},
					{
						one: 0,
						five: 0,
						ten: 0,
						twentyfive: 0,
						fifty: 0,
						hundred: 0,
						twohundred: 0,
						fivehundred: 0,
						thousand: 0,
					},
					{
						one: 0,
						five: 0,
						ten: 0,
						twentyfive: 0,
						fifty: 0,
						hundred: 0,
						twohundred: 0,
						fivehundred: 0,
						thousand: 0,
					},
				],
			};
		case "ADD_CELL":
			return {
				...state,
				cells: [...state.cells, action.data],
			};

		case "REMOVE_CELL":
			return {
				...state,
				cells: state.cells.filter((x) => x !== action.data),
			};

		case "ADD_STACK":
			//console.log(state);

			let previous_stack = state.stacks.filter(
				(stack) => String(stack.ids) === String(action.data.ids)
			);

			let filter_repeated = state.stacks.filter(
				(stack) => String(stack.ids) !== String(action.data.ids)
			);

			//console.log(String(action.data.ids), state);

			if (previous_stack.length > 0) {
				let chips = { ...previous_stack[0].chips };

				for (let property in action.data.chips) {
					if (property in chips)
						chips[property] += action.data.chips[property];
					else chips[property] = action.data.chips[property];
				}

				return {
					...state,
					stacks: [
						...filter_repeated,
						{
							...action.data,
							chips: chips,
						},
					],
				};
			}

			return {
				...state,
				stacks: [...filter_repeated, action.data],
			};

		case "REMOVE_STACK":
			return {
				...state,
				stacks: state.stacks.filter(
					(stack) => String(stack.ids) !== String(action.data.ids)
				),
			};

		case "ADD_CHIPS":
			let new_chips = state.chips;

			for (let prop in action.data)
				if (prop in new_chips) new_chips[prop] += action.data[prop];
				else new_chips[prop] = action.data[prop];

			return {
				...state,
				chips: new_chips,
			};

		case "REMOVE_CHIPS":
			let removed_chips = state.chips;

			for (let prop in action.data)
				if (prop in removed_chips) new_chips[prop] -= action.data[prop];
				else removed_chips[prop] = 0;

			return {
				...state,
				chips: removed_chips,
			};

		case "SET_POPUP":
			return {
				...state,
				feedback: action.state
			}

		case "setStore":
			return {
				...state,
				renderStore: action.payload.state
			}

		default:
			return state;
	}
};

export default cardReducer;
