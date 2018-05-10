
const fetch = require('node-fetch');
const {URL, URLSearchParams} = require('url');
const Song = require('../model/song.js')
const mongoose = require('mongoose')


const router = require('express').Router();


router.get('/getSongList', (req, res) => {
    Song.find({})
        .then(songs =>
            res.send(200, songs))
        .catch(err => {
            res.send(500, err)
        })
})

router.post('/removeSong', (req, res) => {
    Song.findOneAndRemove({
            _id: req.body._id
        })
        .then(() => {
            res.send(204)
            next()
        })
        .catch(err => {
            res.send(500, err)
        })
})

router.post('/updateSongScore', (req, res) => {
    Song.findOne({
            _id: req.body._id
        })
        .then(song => {
            console.log(song.songScore)
            song.songScore = req.body.songScore + song.songScore;
            song.save(function (err) {
                if (err) {
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

router.post('/deleteAllLol', (req, res) => {
    Song.remove({}, function (err) {
        res.send(204, "Everything deleted")
    });
})

router.post('/addSong', (req, res) => {
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


router.get('/searchSong', (req, res) => {



    let search = req.body.search;
    let spotifySearchUrl = 'https://api.spotify.com/v1/search?q=Muse&type=track&limit=3';
    

    let searchValues = `https://api.spotify.com/v1/search?${req.body.q}&type=track&limit=3`

    console.log("Search")
    
    fetch(spotifySearchUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer '+  req.user.accessToken,
                'content-type': 'application/json'
            },
        })
        .then(spotRes  => {
            if(spotRes.status !== 200){
                res.status(spotRes.status).send("error in retreaving data")
                throw spotRes.statusText;
            }
            return spotRes.json()
        })
        .then(spotResJson => {
            

            let foundSongs = [];

            let artists = []; // might be multiple artists
            let songName = "";

            for( var songKey in spotResJson.tracks.items){
                songName = spotResJson.tracks.items[songKey].name;
                for(var artistKey in spotResJson.tracks.items[songKey].artists){
                    artists.push(spotResJson.tracks.items[songKey].artists[artistKey].name)
                }
                
                foundSongs.push({artistName:  Array.from(new Set(artists)), songName: songName})
                artists = [];
                songName = "";
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(foundSongs))

        })
        .catch(error => console.error('Error:', error))
        
})

module.exports = router;