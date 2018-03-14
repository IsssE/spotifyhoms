const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser');
var mongoose = require('mongoose')

require('./routes/song.js') 


const app = express();
//cors sets
app.use(cors())
const port = process.env.PORT || 1337;
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//connect to mongo db (with mogoose)
mongoose.connect('mongodb://127.0.0.1:27017')
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  //Connection success!
    console.log("logged in to database: " + mongoose.Mongoose.name)
});

var lastMessage = "We have just started, write sometihing to save message"


// *** Move these to own files? ***
//  require('./routes/songs')(server)

app.get('/api/hello', (req, res) => {
    res.send({express: 'Hello From Express' });
  });

app.get('/api/response', (req, res) => {
    res.send({data: lastMessage});
});

app.post('/api/login', (req, res) => {
    
});

app.post('/api/changeMessage', (req, res) => {
    lastMessage = req.body.message;
})

 app.listen(port, () => console.log(`Listening on port ${port}`));

