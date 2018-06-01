import React, {Component} from "react"
import PropTypes from 'prop-types';
import TrackItem from "./TrackListItem";


class TrackList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const listItems = this.props.items.map((trackItem) => {
            return (
                <TrackItem
                    key={trackItem._id}
                    id={trackItem._id}
                    title={trackItem.title ? trackItem.title : "id:" + trackItem._id}
                />
            );
        });

        return (
            <div>
                <label>{this.props.items.length}</label>
                 <ol> {listItems} </ol>
            </div>
        )
    }
}

TrackList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string
    }))
};

TrackList.defaultProps = {
    items: []
};

export default TrackList;