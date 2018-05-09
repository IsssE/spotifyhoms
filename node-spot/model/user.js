var mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    displayName: String,
    spotifyId: {type: String, unique : true}
});
var User = mongoose.model ('User', UserSchema);

module.exports= User;
