var mongoose = require('mongoose')

const SongSchema = new mongoose.Schema({
    artist: String,
    songName: String, 
    voteScore: Number
});
var Song = mongoose.model ('Song', SongSchema);

module.exports= {
    Song: Song
}