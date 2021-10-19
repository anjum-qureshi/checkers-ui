import React, { useState } from "react";

import "./App.css";

import Board from "./Board";
import { PLAYERS } from "./defaultState";
import { getCoinInfo } from "./utils";

const movePlayerCoin = (player, from, to) => {
	const coins = player.coins.reduce((coins, coin) => {
		const newCoin = { ...coin };
		if (coin.row == from.row && coin.col == from.col) {
			newCoin.r = to.row;
			newCoin.c = to.col;
		}
		return [...coins, newCoin];
	}, []);
	return { ...player, coins };
};

const Game = () => {
	const [players, setState] = useState(PLAYERS);
	const [from, setFrom] = useState(undefined);
	const [to, setTo] = useState(undefined);
	const [currPlayerIndex, setCurrPlayerIndex] = useState(0);

	const moveCoin = (evt) => {
		evt.preventDefault();
		const updatedPlayers = {
			[currPlayerIndex]: movePlayerCoin(
				players[currPlayerIndex],
				from,
				to,
			),
			[1 - currPlayerIndex]: players[1 - currPlayerIndex],
		};
		setState(updatedPlayers);
		setFrom(undefined);
		setTo(undefined);
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
