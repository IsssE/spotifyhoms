var mongoose = require('mongoose')

const SongSchema = new mongoose.Schema({
    /*
    songId: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
        index: true,
        required: true,
        unique: true,
    },

    */
    artist: String,
    songName: String, 
    songScore: Number
});
var Song = mongoose.model ('Song', SongSchema);

module.exports=  Song
