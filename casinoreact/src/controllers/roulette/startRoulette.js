import { apiURI } from "../../config/keys";

const startRoulette = (userId, rouletteBets) => {
	const body = {
		userId,
		rouletteBets,
	};
	return fetch(`${apiURI}/api/roulette`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify(body),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json())
		.catch((err) => console.error(err));
};

export default startRoulette;
