import React, { Component } from 'react';
import './App.css';
import Login from './Login.js';
import SongList from './SongList.js';
import Container from './Spotify/Container';
//import {Router, Route} from 'react-router-dom'

const API_URL = 'http://localhost:1337';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      /*
      connectionMessage: '',
      lastApiText: '',
      storedMessage: '',
      */
      songList: [{
        id: 0,
        artist: 'Art',
        songName: 'Song',
        songScore: 69
      }],
      userName: '',
      password: '',

      artist: '',
      songName: '',
      songScore: '',

      searchValue: ''
    };
    /*
    this.updateLastMessage = this.updateLastMessage.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.handleChange = this.handleChange.bind(this)    
    */
    this.handleUpdateSongScore = this.handleUpdateSongScore.bind(this)
    this.handleUserNameChange = this.handleUserNameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)    
    this.callApi = this.callApi.bind(this)

    this.handleArtistChange = this.handleArtistChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleScoreChange = this.handleScoreChange.bind(this)
    this.handleNewSong = this.handleNewSong.bind(this)

    this.handleSpotifyLogin = this.handleSpotifyLogin.bind(this)
    
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ songList: res }))
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch(API_URL+'/api/getSongList');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  
  handleNewSong() {
    var body = {
      artist: this.state.artist,
      songName: this.state.songName,
      songScore: this.state.songScore
    }    
    
    fetch(`${API_URL}/api/addSong`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {"Content-Type":"application/json"}
    })

    fetch(`${API_URL}/api/getSongList`)
    .then((response) => response.json())
    .then(res => this.setState({songList: res}))
    this.setState(
      {
      artist: '',
      songName: '',
      songScore: ''
    })

  }
  handleSpotifyLogin(){
    alert("Please go to http://localhost:1337/login")
  }

  handleSearchChange(event) {
    this.setState({searchValue: event.target.value});
  }

  handleSearch() {

    fetch(`${API_URL}/api/searchSong?${this.state.searchValue}`, {
      method: 'GET',
      headers: {"Content-Type":"application/json"}
    })
    .then((response) => {
      if(response.status !== 200) {
        throw response
      }
      else {
        response.json()
      }
    } )
    .then(res => {
      console.log(res)
    }).catch ((err) =>{
      console.log(err)
    })
    
  }

  handleUserNameChange(event) {
    this.setState({userName: event.target.value})
  }
  
  handlePasswordChange(event) {
    this.setState({password: event.target.value})
  }

  handleUpdateSongScore(id, score) {
    let data = {
      id: id,
      songScore: score,
    }

    fetch(`${API_URL}/api/updateSongScore`, {
      body: JSON.stringify(data),  
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    }).then(() =>{
      this.callApi().then(res => this.setState({ songList: res }))
      .catch(err => console.log(err));
    })
  }
  handleRemoveSong(id) {
    let data = {id: id}

    fetch(`${API_URL}/api/removeSong`, {
      body: JSON.stringify(data),  
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    }).catch(err => console.log(err))
    .then(() => {
      this.callApi()
      .then(res => this.setState({ songList: res }))
      .catch(err => console.log(err));
    }).catch(err => console.log(err));
    
  }

  
  /*
  * Temp functions for creating song
  */
  handleArtistChange(event) {
    this.setState({artist: event.target.value})
  }
  handleNameChange(event) {
    this.setState({songName: event.target.value})
  }
  handleScoreChange(event) {
    this.setState({songScore: event.target.value})
  }


  render() {
    console.log("ASDADS:  "+ this.state.songList)
    return (
      <div className="App">

      {/*
      <div>
        <Login
        userName= {this.state.userName}
        password= {this.state.password}
        handleUserNameChange= {this.handleUserNameChange}
        handlePasswordChange={this.handlePasswordChange}
        />
      </div>
      */}
      <br/>
        <div>
          <SongList
          songList={this.state.songList}
          handleUpdateSongScore={this.handleUpdateSongScore}
          handleRemoveSong={this.handleRemoveSong}/>

        </div>
        <div>

            Artist:<input type="text" value={this.state.artist} onChange={this.handleArtistChange} /> <br/>
            Song:<input type="text" value={this.state.songName} onChange={this.handleNameChange}/>  <br/>
            Score:<input type="text" value={this.state.songScore} onChange={this.handleScoreChange}/> <br/>
            <button onClick={this.handleNewSong}>Submit</button>
        </div>

        <div>
          <button onClick={this.handleSpotifyLogin}> Login with spotify </button>
          <Container
            handleSearchChange={this.handleSearchChange}
            handleSearch={this.handleSearch}
          />
        </div>

      </div>

    );
  }
}

export default App;