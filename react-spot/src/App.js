import React, { Component } from 'react';
import './App.css';
import Login from './Login.js';
import SongManager from './SongManager.js';

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
        artist: 'Art',
        songName: 'Song',
        songScore: 69
      }],
      userName: '',
      password: ''
    };
    /*
    this.updateLastMessage = this.updateLastMessage.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.handleChange = this.handleChange.bind(this)    
    this.handleUserNameChange = this.handleUserNameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)    
    */
    this.callApi = this.callApi.bind(this)

  }
/*
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ connectionMessage: res.express }))
      .catch(err => console.log(err));
  }



  sendMessage() {
    fetch(`${API_URL}/api/changeMessage`, {
      method: 'POST',
      body: JSON.stringify({
          message:this.state.storedMessage
      }),
      headers: {"Content-Type":"application/json"}
    })
  }

  updateLastMessage() {
    return fetch(`${API_URL}/api/response`)
    .then((response) => response.json())
    .then(res => this.setState({lastApiText: res.data}))
  } 

  handleChange(event) {
    this.setState({storedMessage: event.target.value})
  }
  */

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ songList: res.songList }))
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch(API_URL+'/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };


  handleUserNameChange(event) {
    this.setState({userName: event.target.value})
  }
  
  handlePasswordChange(event) {
    this.setState({password: event.target.value})
  }

  render() {
    return (
      <div className="App">

      <div>
        <Login
        userName= {this.state.userName}
        password= {this.state.password}
        handleUserNameChange= {this.handleUserNameChange}
        handlePasswordChange={this.handlePasswordChange}
        />
      </div>
      <br/>
        <div>
          <SongManager
          songList={this.state.songList}/>
        </div>

      </div>

    );
  }
}

export default App;