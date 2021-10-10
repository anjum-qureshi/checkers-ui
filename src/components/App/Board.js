import React from "react";

import "./board.css";

const Coin = ({ color, ...props }) => {
	return <div className={`coin ${color}`} {...props} />;
};

const renderCell = ({
	color,
	coin,
	number,
	index,
	move,
	selectCoin,
	selectPlace,
}) => {
	if (coin) {
		return (
			<div className={`cell ${color}`} key={"cell_" + index}>
				<Coin
					color={coin}
					number={number}
					draggable
					onDragEnter={(ev) => {
						ev.preventDefault();
						selectCoin(number);
					}}
					onDragEnd={move}
				/>
			</div>
		);
	}
	return (
		<div
			className={`cell ${color}`}
			key={"cell " + index}
			onDragOver={(ev) => {
				ev.preventDefault();
				selectPlace(number);
			}}
		/>
	);
};

const renderRow = (row, rowIndex, props) => {
	return (
		<div className="row" key={"row_" + rowIndex}>
			{row.map((coin, index) =>
				renderCell({
					...coin,
					index,
					...props,
				}),
			)}
		</div>
	);
};

const Board = ({ layout, move, selectCoin, selectPlace }) => {
	return (
		<div className="board">
			{layout.map((row, index) =>
				renderRow(row, index, {
					move,
					selectPlace,
					selectCoin,
				}),
			)}
		</div>
	);
};

export default Board;
