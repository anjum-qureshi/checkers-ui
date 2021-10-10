const createGame = async (player) => {
	const response = await fetch(`/api/game/create`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: player,
	});
	console.log("create game response", response.body);
	return response;
};

const addPlayer = async (player) => {
	const response = await fetch(`/api/game/add-player`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: player,
	});
	console.log("add player", response.body);
	return response;
};

const startGame = async () => {
	const response = await fetch(`/api/game/start`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	});
	console.log("response", response.body);
	return response;
};

const moveCoin = async (from, to) => {
	const response = await fetch(`/api/game/start`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: { from, to },
	});
	console.log("response", response.body);
	return response;
};

export { createGame, addPlayer, startGame, moveCoin };
