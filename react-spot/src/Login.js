
import React, {Component} from 'react';


class Login extends Component {

    /*
    constructor(props) {
        super(props);
    }
    */
    render() {
        return (
        <div>
            <form>
                <label>Username: </label>
                <input type='text' value={this.props.userName} onChange={this.props.handleUserNameChange}/>
                <br/>
                <label>Password: </label>
                <input type='password' value={this.props.password} onChange={this.props.handlePasswordChange} />
            </form>
        </div>
        )
    }
    
}

export default Login;