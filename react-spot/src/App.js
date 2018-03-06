import React, { Component } from 'react';
import './App.css';
import Login from './Login.js';

const API_URL = 'http://localhost:1337';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      connectionMessage: '',
      lastApiText: '',
      storedMessage: ''
    };
    this.callApi = this.callApi.bind(this)
    this.updateLastMessage = this.updateLastMessage.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ connectionMessage: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

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

  render() {
    return (
      <div className="App">
      <div className="test-App">
        <button onClick={this.updateLastMessage}>Press to API</button>
        <p>{this.state.connectionMessage}</p>
        <p>{this.state.lastApiText}</p>
        <form>
          <input type="text" value={this.state.storedMessage} onChange={this.handleChange} /> 
        </form>
        <button onClick={this.sendMessage}>Send to API</button>
      </div>

      <div>
        <Login/>
      </div>

      </div>

    );
  }
}

export default App;
