
var Song = require('../model/song.js')

module.exports = function(server) {

    /*
        Create
        
        Song: 
         - artist
         - songName
         - voteScore

    */
    server.post('/api/addSong', (req, res) => {
        
        let data = req.body;

        Song.create(data)
        .then(task => {
            res.send(200, task)
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
