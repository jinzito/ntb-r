// https://github.com/reduxjs/react-redux/issues/914

import React, { PureComponent } from "react";
import * as actions from "../../scenes/Info/services/InfoActions";
import { connect } from "react-redux";

/*
const Audio = React.forwardRef((props, ref) => (
    <audio
        {...props}
        // autoPlay={true}
        ref={ref}
        src={"http://radio.ingi.by/stream"}
        crossOrigin={"anonymous"}
    />
));
*/

class Audio extends PureComponent {
    render(props, ref) {
        return (
            <audio
                {...props}
                ref={ref}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        streamLoading: state.streamLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadInfo: () => {
            dispatch(actions.loadInfo());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Audio);
