
var tokens = require('./Tokens')

var User = require('./model/user.js')

var cors = require('cors')
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var passport = require('passport');

var express = require('express');
var bodyParser = require('body-parser');

const SpotifyStrategy = require('passport-spotify').Strategy;

var swig = require('swig');
var consolidate = require('consolidate');

passport.use(new SpotifyStrategy({
    clientID: tokens.spotifyToken,
    clientSecret: tokens.spotifySecretToken,
    callbackURL: "http://localhost:1337/auth/spotify/callback"
  },
  (accessToken, refreshToken, expires_in, profile, done) => {

    console.log(profile)

    User.findOne({spotifyId: profile.id}).then((currentUser) => {
      if(currentUser) {
        console.log("user already in database.")
      }
      else {
        new User({
          spotifyId: profile.id,
          displayName: profile.displayName,
        }).save().then((newUser) => {
          console.log("new User created" + newUser)
        })
      }
    }).catch((err) => {
      return handleError(err)
    })
    console.log(accessToken);
    
    return done(null, profile);
  }
));
// Stop error 'Failed to serialize user into session'
// not sure what it does
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

const app = express();
//cors sets
app.use(cors())
const port = process.env.PORT || 1337;
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(passport.initialize());
app.use(passport.session());

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

require('./routes/songManager.js') (app)

app.post('/', (req, res) => {
  console.log("This is a empty site. This is used for spotyfier backend.")
})

app.post('/api/changeMessage', (req, res) => {
    lastMessage = req.body.message;
})

app.get('/auth/spotify',
  passport.authenticate('spotify'),
  function(req, res){
    console.log("auth")
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  });

app.get('/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/auth/spotify' }),
  function(req, res) {
    console.log("Successfull redirect!")
    // Successful authentication, redirect home.
    res.redirect('/');
  });

function handleError(error) {
  console.log("there has been a error, message: " + error.message)
}; 

  app.listen(port, () => console.log(`Listening on port ${port}`));

