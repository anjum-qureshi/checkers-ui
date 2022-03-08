import React, { useState } from "react";

import "./App.css";

import Board from "./Board";
import { PLAYERS } from "./defaultState";
import { getCoinInfo, possibleMoves } from "./utils";

const movePlayerCoin = (player, from, to) => {
	const coins = player.coins.reduce((coins, coin) => {
		if (coin.row == from.row && coin.col == from.col) {
			coin.row = to.row;
			coin.col = to.col;
		}
		return [...coins, coin];
	}, []);
	return { ...player, coins };
};

const updateIsDraggable = (players) => {
	const canBeMoved = (coin, start, finish) =>
		possibleMoves(players)(coin, start, finish).length > 0;

	return players.map((player) => ({
		...player,
		coins: player.coins.map((coin) => ({
			...coin,
			draggable: canBeMoved(coin, player.start, player.finish),
		})),
	}));
};

const isValidMove = (players, toCell, coin, currPlayerIndex) => {
	const { start, finish } = players[currPlayerIndex];
	const moves = possibleMoves(players)(coin, start, finish);
	return moves.some(
		(move) => toCell.row == move.row && toCell.col == move.col,
	);
};

const Game = () => {
	const [players, setState] = useState(updateIsDraggable(PLAYERS));
	const [from, setFrom] = useState(undefined);
	const [to, setTo] = useState(undefined);
	const [currPlayerIndex, setCurrPlayerIndex] = useState(0);

	const moveCoin = (evt) => {
		evt.preventDefault();
		if (!isValidMove(players, to, from, currPlayerIndex)) return;
		const updatedPlayers = [];
		updatedPlayers[currPlayerIndex] = movePlayerCoin(
			players[currPlayerIndex],
			from,
			to,
		);

		updatedPlayers[1 - currPlayerIndex] = players[1 - currPlayerIndex];
		setState(updateIsDraggable(updatedPlayers));
		setFrom(undefined);
		setTo(undefined);
		setCurrPlayerIndex(1 - currPlayerIndex);
	};

	return (
		<Board
			getCoinAt={getCoinInfo(players)}
			move={moveCoin}
			selectCoin={setFrom}
			selectCell={setTo}
		/>
	);
};

export default Game;
