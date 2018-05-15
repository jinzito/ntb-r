import React, {Component} from "react"
import TrackListItem from "../../components/TrackList/TrackItemsList";

class Tracks extends Component {

    constructor(props) {
        super(props);
        this.state = {hasData: false, filter:"", order:null, trackList:[], trackListSource:[]};
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.updateTrackList.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/tracks", {
            method: "POST"
        }).then(response => response.json()).catch(err => {
            console.log("1", err);
        }).then((trackList) => {
            this.setState({trackListSource: trackList, hasData: true});
            this.handleSearchChange();
        }).catch(err => {
            console.log(err);
        })
    }

    handleSearchChange(event) {
        const filtersString = (event && event.target) ? event.target.value.toLowerCase() : "";
        const filters = filtersString.split(" ").filter(item => item && item.length > 0);

        const trackList = this.state.trackListSource.filter(item => {
            if (filters.length === 0 ) {
                return true;
            }
            const title = item && item.title ? item.title.toLowerCase() : null;
            if (!title) {
                return false;
            }
            let result = true;
            filters.forEach(oneFilter => {
                if (title.indexOf(oneFilter) === -1) {
                    result = false;
                }
            });
            return result;
        });
        this.setState({filter: filtersString, trackList: trackList});
    }

    updateTrackList() {

    }

    render() {
        return (
            <div>
                { !this.state.hasData ? <label>Loading...</label> : <input value={this.state.filter} onChange={this.handleSearchChange}/>}
                <TrackListItem items={this.state.trackList}/>
            </div>
        )
    }
}

// Tracks.propTypes = {
//     trackList: PropTypes.arrayOf(PropTypes.shape({
//         _id: PropTypes.string.isRequired,
//         title: PropTypes.string.isRequired
//     })),
//     hasData: PropTypes.bool
// };
//
// TrackListItem.defaultProps = {
//     trackList: [],
//     hasData: false
// };

export default Tracks;