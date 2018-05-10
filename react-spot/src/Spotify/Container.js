import React, {Component} from 'react';
import Search from './Search.js'

class Container extends Component {
    constructor(props) {
      super(props);
    }
    render(){
        return (<div> <Search
        handleSearchChange = {this.props.handleSearchChange}/>
        <button onClick={this.props.handleSearch}> Search Spotify </button>
        </div>)
    }
}

export default Container;