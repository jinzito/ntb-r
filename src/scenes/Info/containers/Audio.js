import React from "react";
import * as actions from "../services/StreamActions";
import { connect } from "react-redux";
import PropTypes from 'prop-types';


// Workaround with connect() does not work with React.forwardRef
// https://github.com/reduxjs/react-redux/issues/914

class WrappedAudio extends React.Component {
    render() {
        // return <SomeInnerComponent ref={this.props.myForwardedRef} />;
        return <audio
            {... this.props}
            ref={this.props.rf}
            onPlay={this.props.onPlay}
            onPaste={this.props.onPause}
            onCanPlay={this.props.onCanPlay}
        />;
    }
}

WrappedAudio.propTypes = {
    rf: PropTypes.object
};

const mapStateToProps = state => {
    return {
        // streamLoading: state.stream.isLoading
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
)(WrappedAudio);

export default React.forwardRef((props, ref) =>
    <ConnectedMyComponent {...props} rf={ref}/>
);


