const hasCoin = (player, { row, col }) =>
	player.coins.some((coin) => coin.row == row && coin.col == col);

const validateMove = (players) => (position) => {
	return players.every((player) => !hasCoin(player, position));
};

const possibleMoves = (players) => ({ row, col, isKing }, start, finish) => {
	const colMap = {
		1: [2],
		3: [2, 4],
		5: [4, 6],
		7: [6, 8],
		2: [1, 3],
		4: [3, 5],
		6: [5, 7],
		8: [7],
	};
	const dirValueMap = { UP: -1, DOWN: 1 };
	const directions = [dirValueMap[finish]];
	if (isKing) {
		directions.push(dirValueMap[start]);
	}
	const moves = directions
		.map((dir) => colMap[col].map((c) => ({ col: c, row: row + dir })))
		.flat();
	return moves.filter(validateMove(players));
};

const getCoinInfo = (players) => ({ row, col }) => {
	for (let index = 0; index < players.length; index++) {
		const coin = players[index].coins.find(
			(coin) => coin.row == row && coin.col == col,
		);
		if (coin) {
			return {
				...coin,
				color: players[index].color,
				start: players[index].start,
				finish: players[index].finish,
			};
		}
	}
};

export { getCoinInfo, possibleMoves };
