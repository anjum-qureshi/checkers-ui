const express = require("express");
const fs = require('fs')

const app = express();
const port = process.env.PORT || 8080;
const HTML_FILE = './dist/index.html';

app.use(express.static('./dist'));

app.get('/', (req, res) => {
 res.send(fs.readFileSync(HTML_FILE,'utf-8'));
});

app.get('/api/hello', (req, res) => {
    res.send("helllo");
});

app.listen(port, ()=> {
 console.log('Magix world!! here ' + port);
});
