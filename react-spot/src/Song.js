import React, {Component} from 'react';

class Song extends Component {
    render() {
        return (
            <div>
                [<span>{this.props.songScore}</span>] <span>{this.props.artist}</span> - <span>{this.props.songName}</span>
            </div>
        )
    }
}

export default Song;