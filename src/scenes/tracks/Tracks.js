import React, {Component} from "react"
import TrackListItem from "../../components/TrackList/TrackItemsList";

class Tracks extends Component {

    constructor(props) {
        super(props);
        this.state = {isData: false};
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/tracks", {
            method: "POST"
        }).then(response => response.json()).catch(err => {
            console.log("1", err);
        }).then((trackList) => {
            this.setState({trackList: trackList, isData: true});
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        console.log("Tracks.render", this.state);
        return (
            <div>
                <label>{this.state.isData ? "TRUE" : "FALSE"}</label>
                <TrackListItem items={this.state.trackList}/>
            </div>
        )
    }
}

export default Tracks;