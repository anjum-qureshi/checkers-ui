import React from "react";

import "./App.css";

import Game from "./Game";

const App = () => {
	const players = [
		{ color: "white", name: "Lucifer" },
		{ color: "black", name: "Wolf" },
	];
	return (
		<div className="App">
			<Game players={players} />
		</div>
	);
};

export default App;
