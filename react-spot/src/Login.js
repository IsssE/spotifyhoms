
import React, {Component} from 'react';


class Login extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            userName: '',
            password: ''
        };
        this.handleUserNameChange = this.handleUserNameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)    
    }

    handleUserNameChange(event) {
        this.setState({userName: event.target.value})
    }
    handlePasswordChange(event) {
        this.setState({password: event.target.value})
    }

    render() {
        return (
        <div>
            <form>
                <label>Username: </label>
                <input type='text' value={this.state.userName} onChange={this.handleUserNameChange}/>
                <br/>
                <label>Password: </label>
                <input type='password' value={this.state.password} onChange={this.handlePasswordChange} />
            </form>
        </div>
        )
    }
    
}

export default Login;