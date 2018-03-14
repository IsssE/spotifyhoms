import React, {Component} from 'react';
import SongList from './SongList.js'

class SongManager extends Component {
    render() {
        return (
            <div> 
                <div>
                    <button>Add</button> <button>Edit</button> <button>Remove</button> 

                    <SongList
                    songList = {this.props.songList}/>
                </div>
            </div>

        )
    }
}

export default SongManager;