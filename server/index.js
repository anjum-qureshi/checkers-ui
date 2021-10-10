const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 8080;
const HTML_FILE = "./dist/index.html";

app.use(express.static("./dist"));

app.use(
	"/api/game",
	createProxyMiddleware({
		target: "http://localhost:8000",
		changeOrigin: true,
	}),
);

app.get("/", (req, res) => {
	res.send(fs.readFileSync(HTML_FILE, "utf-8"));
});

app.listen(port, () => {
	console.log("Magix world!! here " + port);
});
