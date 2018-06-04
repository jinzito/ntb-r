import React, {Component} from "react"
import PropTypes from 'prop-types';


class TrackDetails extends Component {


    constructor() {
        super();
        this.state = {hasData: false};
    }

    async componentDidMount() {

        try {
            const trackId = this.props.match.params._id;
            const requestURL = "http://localhost:8080/api/track/" + trackId + "/";
            const response = await fetch(requestURL, {
                method: "POST"
            });
            const trackDetailsData = await response.json();
            this.setState({track: trackDetailsData});
        } catch (error) {
            this.setState({track: null, error: "No track data"});
            console.log(error);
        } finally {
            this.setState({hasData: true});
        }
    }

    render() {

        if (!this.state.hasData) {
            return(<p>Loading...</p>);
        }

        const track = this.state.track;
        return (
            <div>
                <label>{"id:" + track._id + " 1 title:" + track.title}</label>
            </div>
        );
    }
}

TrackDetails.propTypes = {
    track: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        initUrl: PropTypes.string,
        storageId: PropTypes.string,
        coverSrc: PropTypes.string,
        title: PropTypes.string,
        duration: PropTypes.number,
        author: PropTypes.string,
        errorStatus: PropTypes.string,
        created: PropTypes.string
    })
};

export default TrackDetails;