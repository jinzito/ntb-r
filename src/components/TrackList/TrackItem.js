import React, {Component} from "react"
import PropTypes from 'prop-types';


class TrackItem extends Component {

    render() {
        console.log("ID:", this.props.id);
        return (
            <li><a href={"/track/" + this.props.id}>{this.props.title}</a></li>
        );
    }
}

TrackItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default TrackItem;