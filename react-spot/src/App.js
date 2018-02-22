import React, { Component } from 'react';
import './App.css';

const API_URL = 'http://localhost:1337';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      
      response: '',
      buttonStatus: 'Press button to call api'
    };
    this.callApi = this.callApi.bind(this)
    this.buttonPressed = this.buttonPressed.bind(this)
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  buttonPressed() {
    return fetch(`${API_URL}/api/response`)
    .then((response) => response.json())
    .then(res => this.setState({buttonStatus: res.data}))
  } 

  

  render() {
    return (
      <div className="App">
        <button onClick={this.buttonPressed}>Press to API</button>
        <p>{this.state.response}</p>
        <p>{this.state.buttonStatus}</p>
        
      </div>
    );
  }
}

export default App;
