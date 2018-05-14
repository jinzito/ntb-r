import React, {Component} from "react"
import PropTypes from 'prop-types';
import TrackItem from "./TrackItem";


class TrackListItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const listItems = this.props.items.map((trackItem) => {
            return (
                <TrackItem
                    key={trackItem._id}
                    id={trackItem._id}
                    title={trackItem.title}
                />
            );
        });

        console.log("TrackListItem.render", this.props.items.length);
        return (
            <div>
                <label>{this.props.items.length}</label>
                 <ol> {listItems} </ol>
            </div>
        )
    }
}

TrackListItem.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }))
};

TrackListItem.defaultProps = {
    items: []
};

export default TrackListItem;