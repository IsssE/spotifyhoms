const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 1337;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cors())

var lastMessage = "We have just started, write sometihing to save message"

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
  });

app.get('/api/response', (req, res) => {
    res.send({data: lastMessage});
});

app.post('/api/changeMessage', (req, res) => {
    lastMessage = req.body.message;
})

 app.listen(port, () => console.log(`Listening on port ${port}`));

