const player1Coins = [
	{ row: 1, col: 1 },
	{ row: 1, col: 3 },
	{ row: 1, col: 5 },
	{ row: 1, col: 7 },
	{ row: 2, col: 2 },
	{ row: 2, col: 4 },
	{ row: 2, col: 6 },
	{ row: 2, col: 8 },
	{ row: 3, col: 1 },
	{ row: 3, col: 3 },
	{ row: 3, col: 5 },
	{ row: 3, col: 7 },
];
const player2Coins = [
	{ row: 6, col: 2 },
	{ row: 6, col: 4 },
	{ row: 6, col: 6 },
	{ row: 6, col: 8 },
	{ row: 7, col: 1 },
	{ row: 7, col: 3 },
	{ row: 7, col: 5 },
	{ row: 7, col: 7 },
	{ row: 8, col: 2 },
	{ row: 8, col: 4 },
	{ row: 8, col: 6 },
	{ row: 8, col: 8 },
];
const PLAYERS = [
	{
		start: "UP",
		finish: "DOWN",
		color: "white",
		coins: player1Coins.map((ele) => ({
			...ele,
			isKing: true,
		})),
	},
	{
		finish: "UP",
		start: "DOWN",
		color: "black",
		coins: player2Coins.map((ele) => ({
			...ele,
			isKing: true,
		})),
	},
];

const boardLayout = Array(32).fill("black,white").join(",").split(",");

const isOdd = (ele) => ele % 2 != 0;

const splitArray = (array, size = 8) => {
	const length = array.length / size;
	let chunks = [];
	for (let index = 0; index < length; index++) {
		let chunk = array.splice(0, size);
		if (isOdd(index)) {
			chunk = chunk.reverse();
		}
		chunks.push(chunk);
	}
	return chunks;
};

const LAYOUT = splitArray(boardLayout);

export { PLAYERS, LAYOUT };
