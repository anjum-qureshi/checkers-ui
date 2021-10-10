const getCoinColor = (position) => {
	const coins = [
		{
			color: "white",
			positions: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23],
		},
		{
			color: "black",
			positions: [41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63],
		},
	];
	const matchedCoins = coins.find((ele) => ele.positions.includes(position));
	return matchedCoins && matchedCoins.color;
};

const isDraggable = (position) =>
	[27, 25, 23, 21, 41, 43, 45, 47].includes(position);

const generateBoard = () => {
	const board = Array(32)
		.fill("black,white")
		.join(",")
		.split(",")
		.map((color, index) => ({
			color,
			draggable: isDraggable(index + 1),
			coin: getCoinColor(index + 1),
		}));
	let cellIndex = 0;
	return splitArrayAndReverse(board, 8).map((row, index) =>
		row.map((coin, idx) => ({
			...coin,
			number: (cellIndex += 1),
		})),
	);
};

const isOdd = (number) => number % 2 != 0;

const splitArrayAndReverse = (array, size) => {
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

const BOARD = generateBoard();

export { BOARD };
