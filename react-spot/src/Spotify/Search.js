import React, {Component} from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
  

  }


  render () {
    return <input onChange={this.props.handleSearchChange}/>
  }
}

export default Search;