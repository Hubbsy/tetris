const express = require('express');
const path = require('path');


const app = express();

const PORT = process.env.PORT || 3000

app.use(express.static('public'));

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/index.html'));
// });

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/style.css'));
// });


app.listen(PORT, () => console.log(`Houston we have a connection at port ${PORT}`));