import React from "react";
import * as actions from "../services/StreamActions";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import omit from "lodash.omit"


// Workaround with connect() does not work with React.forwardRef
// https://github.com/reduxjs/react-redux/issues/914

class Audio extends React.Component {

    doPlay = () => {
        this.props.rf.current.play();
    }

    doPause = () => {
        this.props.rf.current.pause();
    }

    componentDidMount() {
        this.props.onCanPlay();
    }

    render() {

        let props = this.props;
        if (props.doPause) {
            props.rf.current.pause();
        }
        if (props.doPlay) {
            props.rf.current.play();
        }

        return <audio
            {... omit(this.props, ["doPlay", "doPause"])}
            ref={this.props.rf}
            onPlay={this.props.onPlay}
            onPause={this.props.onPause}
        />;
    }
}

Audio.propTypes = {
    rf: PropTypes.object
};

const mapStateToProps = state => {

    return {
        doPause: state.stream.doPause,
        doPlay: state.stream.doPlay
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onPlay: () => dispatch(actions.onPlayStream()),
        onPause: () => dispatch(actions.onPauseStream()),
        onCanPlay: () => dispatch(actions.onCanPlay())
    };
};

const ConnectedMyComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Audio);

export default React.forwardRef((props, ref) =>
    <ConnectedMyComponent {...props} rf={ref}/>
);
