import React, { useState,useEffect } from "react";

import "./App.css";

import Board from "./Board";
import { BOARD } from "./state";

const move = (coins, from, to, color) => {
	return coins.reduce((updatedBoard, row) => {
		const newRow = row.reduce((updatedRow, cell) => {
			let newCell = { ...cell };
			if (cell.number == from) {
				newCell.coin = undefined;
			}
			if (cell.number == to) {
				newCell.coin = color;
			}
			return [...updatedRow, newCell];
		}, []);

		return [...updatedBoard, newRow];
	}, []);
};

const Game = ({ players }) => {
	const [board, setBoard] = useState(BOARD);
	const [from, setFrom] = useState(undefined);
	const [to, setTo] = useState(undefined);
    const [currPlayerIndex, setCurrPlayerIndex] = useState(0);
      

	const moveCoin = (evt) => {
		evt.preventDefault();
		const updatedBoard = move(
			board,
			from,
			to,
			players[currPlayerIndex].color,
		);
		setBoard(updatedBoard);
		setFrom(undefined);
		setTo(undefined);
	};

	return (
		<Board
			layout={board}
			move={moveCoin}
			selectCoin={setFrom}
			selectPlace={setTo}
		/>
	);
};

export default Game;
