import React from "react";

import "./board.css";
import { LAYOUT } from "./defaultState";

const Coin = ({ color, row, col, select, move, draggable, isKing }) => {
	let star = <></>;
	// if (isKing) {
	// 	star = <div className="king" />;
	// }
	return (
		<div
			className={`coin ${color}`}
			onDragEnter={(ev) => {
				ev.preventDefault();
				select({ row, col, isKing });
			}}
			draggable={draggable}
			onDragEnd={move}
		>
			{star}
		</div>
	);
};

const renderCell = ({
	color,
	move,
	select,
	selectCoin,
	getCoinAt,
	rowIndex,
	colIndex,
}) => {
	const row = rowIndex + 1;
	const col = colIndex + 1;
	let coinElement = <></>;
	const selectCell = (ev) => {
		ev.preventDefault();
		select({ row, col });
	};
	const coin = getCoinAt({ row, col });
	if (coin != undefined) {
		coinElement = <Coin select={selectCoin} move={move} {...coin} />;
	}

	return (
		<div
			className={`cell ${color}`}
			key={"cell " + row + col}
			onDragOver={selectCell}
			row={row + 1}
			col={col}
		>
			{coinElement}
		</div>
	);
};

const renderRow = (
	row,
	rowIndex,
	{ move, selectCell, selectCoin, getCoinAt },
) => {
	return (
		<div className={"row"} key={"row_" + rowIndex}>
			{row.map((cellColor, colIndex) =>
				renderCell({
					color: cellColor,
					rowIndex,
					colIndex,
					move,
					getCoinAt,
					select: selectCell,
					selectCoin,
				}),
			)}
		</div>
	);
};

const Board = ({ move, selectCoin, selectCell, getCoinAt }) => {
	return (
		<div className="board">
			{LAYOUT.map((row, index) =>
				renderRow(row, index, {
					move,
					selectCell,
					selectCoin,
					getCoinAt,
				}),
			)}
		</div>
	);
};

export default Board;
