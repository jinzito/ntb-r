import React from "react";
import * as actions from "../services/VisualizerActions";
import { connect } from "react-redux";

import ButterChurnWrapped from "./../../../components/streaming/ButterChurnWrapped";

const visualizer = React.createRef();
const Visualizer = (props) => (
    <ButterChurnWrapped {...props} ref={visualizer}/>
);

const mapStateToProps = state => {
    const vs = state.visualizer;
    if (vs.doInitVisualizer) {
        visualizer.current.init();
    }
    if (vs.doChangePreset) {
        visualizer.current.loadRandomPreset();
    }
    return {
        // inited: state.visualizer.inited,
        // doInitVisualizer: false,
        // currentPresetName: "",
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInited: () => dispatch(actions.onInited()),
        onPresetChanged: (presetName) => dispatch(actions.onPresetChanged(presetName))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Visualizer);
