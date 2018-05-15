import React, {Component} from "react"
import PropTypes from 'prop-types';


class TrackItem extends Component {

    render() {
        return (
            <li><a href={"/track/" + this.props.id}>{this.props.title}</a></li>
        );
    }
}

TrackItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string
};

export default TrackItem;