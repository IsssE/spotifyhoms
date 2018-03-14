import React, {Component} from 'react';

class Song extends Component {
    render() {
        return (
            <div style={managerStyle}> 
                
                <div>
                [<span>{this.props.songScore}</span>] <span>{this.props.artist}</span> - <span>{this.props.songName}</span>
                </div>
                <div>
                <button onClick={()=>this.props.handleUpdateSongScore(this.props.id, 1)}>Up</button> <br/>
                <button onClick={()=>this.props.handleUpdateSongScore(this.props.id, -1)}>Down</button>
                </div>
                <button onClick={()=>this.props.handleRemoveSong(this.props.id)}>Remove</button>
                
            </div>

        )
    }
}
const managerStyle = {
    display: 'flex',
    flexdirection: 'row'
}

export default Song;