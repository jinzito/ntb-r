import React, {Component} from "react"
import PropTypes from 'prop-types';


class TrackDetails extends Component {


    //TODO get track info

    render() {
        return (
            <div>
                <label>{"id:" + this.props.id + " title:" + this.props.title}</label>
            </div>
        );
    }
}

TrackDetails.propTypes = {
    _id: PropTypes.string.isRequired,
    title: PropTypes.string
};

export default TrackDetails;