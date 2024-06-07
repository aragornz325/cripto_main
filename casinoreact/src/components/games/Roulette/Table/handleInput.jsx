export const filterHovered = (ids, state, Cells) => {
	getInvolved(ids, Cells).map((cell) => {
		return state
			? cell.ref.classList.add("hovered")
			: cell.ref.classList.remove("hovered");
	});
};

export const placeBet = (ids, position, Cells) => {};

export const getInvolved = (ids, Cells) => {
	let involved = [];

	if (ids.length > 1) {
		if (
			ids.includes("1st 12") ||
			ids.includes("2nd 12") ||
			ids.includes("3rd 12")
		) {
			ids.filter(
				(id) => id !== "1st 12" && id !== "2nd 12" && id !== "3rd 12"
			).map((id) => {
				return Cells.filter((cell) => id === cell.id).map((cell) => {
					return involved.push(
						Cells.filter(
							(another) =>
								cell.pos[0] === another.pos[0] &&
								/^\d+$/.test(another.id)
						)
					);
				});
			});
		} else {
			ids.map((id) => {
				return involved.push(Cells.filter((cell) => cell.id === id));
			});
		}
	} else {
		let id = ids[0];

		switch (id) {
			case "RED":
				involved.push(Cells.filter((cell) => cell.color === 1));

				break;
			case "BLACK":
				involved.push(Cells.filter((cell) => cell.color === 2));

				break;
			case "EVEN":
				involved.push(
					Cells.filter((cell) => cell.id % 2 === 0 && cell.id !== "0")
				);

				break;
			case "ODD":
				involved.push(Cells.filter((cell) => cell.id % 2 === 1));

				break;
			case "ROW1":
				involved.push(
					Cells.filter(
						(cell) =>
							cell.pos[1] === 0 &&
							cell.id !== "0" &&
							cell.id !== "ROW1"
					)
				);

				break;
			case "ROW2":
				involved.push(
					Cells.filter(
						(cell) => cell.pos[1] === 1 && cell.id !== "ROW2"
					)
				);

				break;
			case "ROW3":
				involved.push(
					Cells.filter(
						(cell) => cell.pos[1] === 2 && cell.id !== "ROW3"
					)
				);

				break;
			case "1st 12":
				involved.push(
					Cells.filter((cell) => 0 < cell.id && cell.id < 13)
				);

				break;
			case "2nd 12":
				involved.push(
					Cells.filter((cell) => 12 < cell.id && cell.id < 25)
				);

				break;
			case "3rd 12":
				involved.push(
					Cells.filter((cell) => 24 < cell.id && cell.id < 37)
				);

				break;
			case "1to18":
				involved.push(
					Cells.filter((cell) => 0 < cell.id && cell.id < 19)
				);

				break;
			case "19to36":
				involved.push(
					Cells.filter((cell) => 18 < cell.id && cell.id < 37)
				);

				break;

			default:
				involved.push(Cells.filter((cell) => cell.id === id));
		}
	}

	return involved.flat(1);
};
