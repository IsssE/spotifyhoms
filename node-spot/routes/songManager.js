
var Song = require('../model/song.js')
var mongoose = require('mongoose')


module.exports = function(server) {

    /*
        Create
        
        Song: 
         - artist
         - songName
         - voteScore

    */
    server.get('/api/getSongList', (req, res) =>{
        Song.find({})
        .then(songs =>
        res.send(200, songs))
        .catch(err => {
            res.send(500, err)
        }) 
    })

    server.post('/api/removeSong', (req, res) =>{
        Song.findOneAndRemove({_id: req.body._id})
        .then(() => {
            res.send(204)
            next()
        })
        .catch(err => {
            res.send(500, err)
        })  
    })

    server.post('/api/updateSongScore', (req, res) => {
        Song.findOne({_id: req.body._id})
        .then(song => {
            console.log(song.songScore)
            song.songScore = req.body.songScore + song.songScore;
            song.save(function (err) {
                if (err)
                {
                    console.log("error in updating song score")
                    console.log(err);
                }
            res.send(200, song)
            next()
            })
        })
        .catch(err => {
            res.send(500, err)
        })  
    })

    server.post('/api/deleteAllLol', (req, res) => {
        Song.remove({}, function(err)  { 
            res.send(204, "Everything deleted")
         });
    })

    server.post('/api/addSong', (req, res) => {
        let data = req.body;
        data.songId = mongoose.Types.ObjectId();
        Song.create(data)
        .then(task => {
            res.send(204, task)
            next()
        })
        .catch(err => {
            res.send(500, err)
        })

        // check if song already exsists
    
        // if new song -> create new song
    
        // store song to db
    
    });
}
