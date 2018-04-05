import React, {Component} from 'react';
import Search from './Search.js'

class Container extends Component {
    constructor(props) {
      super(props);
    }
    render(){
        return <Search
        handleSearchChange = {this.props.handleSearchChange}/>;
    }
}

export default Container;