const stringifyBet = (bet) => {
	let horribleApiReadyBet = {
		one: 0,
		five: 0,
		ten: 0,
		twentyfive: 0,
		fifty: 0,
		hundred: 0,
		twohundred: 0,
		fivehundred: 0,
		thousand: 0,
	};

	for (let prop in bet) {
		let key;

		switch (Number(prop)) {
			case 1:
				key = "one";
				break;
			case 5:
				key = "five";
				break;
			case 10:
				key = "ten";
				break;
			case 25:
				key = "twentyfive";
				break;
			case 50:
				key = "fifty";
				break;
			case 100:
				key = "hundred";
				break;
			case 200:
				key = "twohundred";
				break;
			case 500:
				key = "fivehundred";
				break;
			case 1000:
				key = "thousand";
				break;
			default:
				key = undefined;
				break;
		}
		horribleApiReadyBet[key] = bet[prop];
	}
	let sum = 0;
	for(let key in horribleApiReadyBet){
		const m = { one: 1, five: 5, ten: 10, twentyfive: 25, fifty: 50, hundred: 100, twohundred: 200, fivehundred: 500, thousand: 1000 };
		sum += horribleApiReadyBet[key] * m[key];
	}
	return sum;
};

export const formatBet = (bet, ids, Cells) => {
	bet = stringifyBet(bet);

	let format;

	if (ids.length > 1) {
		if (
			ids.includes("1st 12") ||
			ids.includes("2nd 12") ||
			ids.includes("3rd 12")
		) {
			let cols = [];

			ids.filter(
				(id) => id !== "1st 12" && id !== "2nd 12" && id !== "3rd 12"
			).map((id) => {
				Cells.filter((cell) => id === cell.id).map((cell) => {
					cols.push(cell.pos[0]);
				});
			});

			if (cols.lenght > 1)
				return (format = {
					doubleColumns: cols,
					type: "doubleColumns",
					bet,
				});
			else
				return (format = {
					column: cols[0],
					type: "column",
					bet,
				});
		} else {
			let group = [];
			ids.map((id) => {
				group.push(id);
			});

			switch (group.length) {
				case 2:
					return (format = {
						double: group,
						type: "double",
						bet,
					});
				case 3:
					return (format = {
						triple: group,
						type: "triple",
						bet,
					});
				case 4:
					return (format = {
						cuadruple: group,
						type: "quarter",
						bet,
					});
			}
		}
	} else {
		let id = ids[0];

		switch (id) {
			case "RED":
				return (format = {
					color: "RED",
					type: "color",
					bet,
				});

			case "BLACK":
				return (format = {
					color: "BLACK",
					type: "color",
					bet,
				});
				break;

			case "EVEN":
				return (format = {
					isOdd: false,
					type: "isOdd",
					bet,
				});
				break;

			case "ODD":
				return (format = {
					isOdd: true,
					type: "isOdd",
					bet,
				});
				break;

			case "ROW1":
				return (format = {
					row: 1,
					type: "row",
					bet,
				});

			case "ROW2":
				return (format = {
					row: 2,
					type: "row",
					bet,
				});
				break;

			case "ROW3":
				return (format = {
					row: 3,
					type: "row",
					bet,
				});
				break;

			case "1st 12":
				return (format = {
					dozen: 1,
					type: "dozen",
					bet,
				});
				break;

			case "2nd 12":
				return (format = {
					dozen: 2,
					type: "dozen",
					bet,
				});
				break;

			case "3rd 12":
				return (format = {
					dozen: 3,
					type: "dozen",
					bet,
				});
				break;

			case "1to18":
				return (format = {
					lessThanEighteen: true,
					type: "lessThanEighteen",
					bet,
				});

				break;
			case "19to36":
				return (format = {
					lessThanEighteen: false,
					type: "lessThanEighteen",
					bet,
				});

				break;

			default:
				return (format = {
					number: id,
					type: "number",
					bet,
				});
		}
	}
};
