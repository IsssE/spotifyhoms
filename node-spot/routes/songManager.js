
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
            _id: req.body.id
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
    console.log("updatescore")
    console.log(req.body)
    Song.findOne({
            _id: req.body.id
        })
        .then(song => {
            console.log(song.songScore)
            song.songScore = req.body.songScore + song.songScore;
            console.log("new songScore: " + song.songScore)
            song.save( (err) => {
                if (err) {
                    console.log("error in updating song score")
                    console.log(err);
                }
                res.status(200).send(song)
            })
        })
        .catch(err => {
            res.status(500).send(err)
        })
        
})

router.post('/deleteAllLol', (req, res) => {
    Song.remove({}, function (err) {
        res.send(204, "Everything deleted")
    });
})

router.post('/addSong', (req, res) => {
    console.log("add" + JSON.stringify(req.body))
    let data = req.body;
    Song.create(data)
        .then(task => {
            res.status(204).send(task)
            next()
        })
        .catch(err => {
            res.status(500).send(err)
        })


});


router.get('/searchSong', (req, res) => {

    let search = req.body.search;
    let spotifySearchUrl = 'https://api.spotify.com/v1/search?q=Muse&type=track&limit=1';
    

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