const express = require("express");
const fs = require('fs')

const app = express();
const HTML_FILE = './dist/index.html';

app.use(express.static('./dist'));

app.get('/', (req, res) => {
    res.send(fs.readFileSync(HTML_FILE, 'utf-8'));
});

module.exports = app;
