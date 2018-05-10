const fetch = require('node-fetch');
var tokens = require('./Tokens')
const songManager = require('./routes/songManager.js')
var User = require('./model/user.js')

var cors = require('cors')
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var passport = require('passport');
const cookieSession = require('cookie-session')

var express = require('express');
var bodyParser = require('body-parser');

const SpotifyStrategy = require('passport-spotify').Strategy;

var swig = require('swig');
var consolidate = require('consolidate');

const app = express();

passport.use(new SpotifyStrategy({
    clientID: tokens.spotifyToken,
    clientSecret: tokens.spotifySecretToken,
    callbackURL: "http://localhost:1337/auth/spotify/callback"
  },
  (accessToken, refreshToken, expires_in, profile, done) => {

    User.findOne({spotifyId: profile.id}).then((currentUser) => {
      if(currentUser) {
        console.log("user already in database.")
        done(null, currentUser)
      }
      else {
        new User({
          spotifyId: profile.id,
          displayName: profile.displayName,
          accessToken: accessToken,
          refreshToken: refreshToken,
        }).save().then((newUser) => {
          console.log("new User created")
          done(null, newUser)
        })
      }
    }).catch((err) => {
      return handleError(err)
    })
  }
));
// Stop error 'Failed to serialize user into session'
// not sure what it does
passport.serializeUser((user, done) =>{
  console.log(user.id)
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user)=> {
    done(null, user);
  })
});

// Init passport cookies
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, // = 24h
  keys: [tokens.superSecretToken]
}));
app.use(passport.initialize());
app.use(passport.session());

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

// *** Move these to own files? ***
//  require('./routes/songs')(app)


app.use('/api', songManager)

app.post('/', (req, res) => {
  console.log("This is a empty site. This is used for spotyfier backend.")
  console.log(req.user)
})

app.post('/api/changeMessage', (req, res) => {
    lastMessage = req.body.message;
})

app.get('/auth/spotify',
  passport.authenticate('spotify', {
    scope: ["user-read-private", "user-read-email"]
  }),
  function(req, res){
    console.log("auth")
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  });

app.get('/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/auth/spotify' }),
  function(req, res) {
    res.send("Successfull login!. Your auth code: " + req.user.accessToken)
    // Successful authentication, redirect home.

  });

function handleError(error) {
  console.log("there has been a error, message: " + error.message)
}; 

  app.listen(port, () => console.log(`Listening on port ${port}`));

