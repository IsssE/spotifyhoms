const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser');
var mongoose = require('mongoose')



const server = express();
//cors sets
server.use(cors())
const port = process.env.PORT || 1337;
server.use(bodyParser.json()); // support json encoded bodies
server.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//connect to mongo db (with mogoose)
mongoose.connect('mongodb://127.0.0.1:27017')
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  //Connection success!
    console.log("logged in to database: " + mongoose.Mongoose.name)
});

// *** Move these to own files? ***
//  require('./routes/songs')(server)

require('./routes/songManager.js') (server)

server.post('/api/login', (req, res) => {
    
});

server.post('/api/changeMessage', (req, res) => {
    lastMessage = req.body.message;
})

 server.listen(port, () => console.log(`Listening on port ${port}`));

