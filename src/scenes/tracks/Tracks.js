import React, {Component} from "react"
import TrackListItem from "../../components/TrackList/TrackList";

class Tracks extends Component {

    constructor(props) {
        super(props);
        this.state = {hasData: false, filter: "", order: null, trackList: [], trackListSource: []};
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    async componentDidMount() {

        try {
            const response = await fetch("http://localhost:8080/api/tracks", {
                method: "POST"
            });
            const trackList = await response.json();
            this.setState({trackListSource: trackList});
        } catch (error) {
            this.setState({trackListSource: []});
            console.log(error);
        } finally {
            this.setState({hasData: true});
            this.handleSearchChange();
        }
    }

    handleSearchChange(event) {
        const filtersString = (event && event.target) ? event.target.value.toLowerCase() : "";
        const filters = filtersString.split(" ").filter(item => item && item.length > 0);

        const trackList = this.state.trackListSource.filter(item => {
            if (filters.length === 0) {
                return true;
            }
            const title = item && item.title ? item.title.toLowerCase() : null;
            if (!title) {
                return false;
            }
            for (const filterEntrance of filters) {
                if (title.indexOf(filterEntrance) === -1) {
                    return false;
                }
            }
            return true;
        });
        this.setState({filter: filtersString, trackList: trackList});
    }

    render() {
        return (
            <div>
                {!this.state.hasData ? <label>Loading...</label> :
                    <input value={this.state.filter} onChange={this.handleSearchChange}/>}
                <TrackListItem items={this.state.trackList}/>
            </div>
        )
    }
}

export default Tracks;