var mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    displayName: String,
    spotifyId: {type: String, unique : true},
    accessToken: {type: String}
});
var User = mongoose.model ('User', UserSchema);

module.exports= User;
