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
                <div> 
                    {
                        /*
                        <button>Add</button> <button>Edit</button> <button>Remove</button> 
                        */
                    }
                    
                </div>
                <ol>
                    {
                        this.props.songList.map((song) => {
                            
                            return  (
                                <Song
                                    key={song._id}
                                    id={song._id}
                                    artist={song.artist}
                                    songName={song.songName}
                                    songScore={song.songScore}
                                    handleUpdateSongScore={this.props.handleUpdateSongScore}
                                    handleRemoveSong={this.props.handleRemoveSong}
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