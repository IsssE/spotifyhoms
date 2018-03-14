import React, {Component} from 'react';
import Song from './Song.js'

class SongList extends Component {
    render() {
        if(this.props.songList.length === 0)
        {
            return <h3> No songs in list </h3>
        }
        return (
            <div>
                <ol>
                    {
                        this.props.songList.map((song, i) => {
                            return  (
                                <Song
                                    key={i}
                                    artist={song.artist}
                                    songName={song.songName}
                                    songScore={song.songScore}
                                />
                                );
                        })
                    }
                </ol>
            </div>
        )
    }
}

export default SongList;