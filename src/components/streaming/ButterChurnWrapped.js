import React, { Component } from "react";
import PropTypes from 'prop-types';
import butterchurn from "butterchurn";
import butterchurnPresets from "butterchurn-presets";

class ButterChurnWrapped extends Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.state = {w: 100, h: 100};
        this.inited = false;
        this.presets = butterchurnPresets.getPresets();
    }

    init = () => {

        if (this.inited) {
            return;
        }

        const canvas = this.canvasRef.current;
        const audioContext = new AudioContext();
        this.visualizer = butterchurn.createVisualizer(audioContext, canvas, {
            width: window.innerWidth,
            height: window.innerHeight,
            pixelRatio: window.devicePixelRatio || 1,
            textureRatio: 1
        });

        const audioNode = this.props.audioRef.current;
        console.log(audioNode);
        if (!(audioNode instanceof HTMLAudioElement)) {
            throw new Error("prop audioRef on instance of HTMLAudioElement");
        }
        const sourceNode = audioContext.createMediaElementSource(audioNode);
        const delayedAudible = audioContext.createDelay();
        delayedAudible.delayTime.value = .26;
        const gainAudible = audioContext.createGain();
        gainAudible.gain.value = 1;
        sourceNode.connect(delayedAudible);
        delayedAudible.connect(gainAudible);
        gainAudible.connect(audioContext.destination);
        this.visualizer.connectAudio(delayedAudible);

        this.loadRandomPreset();
        this.startRendering();

        this.inited = true;
        this.props.onInited();
    };

    loadRandomPreset = () => {
        const len = Object.keys(this.presets).length;
        const presetName = Object.keys(this.presets)[Math.round(Math.random() * len)];
        const preset = this.presets[presetName];
        this.visualizer.loadPreset(preset, this.props.blendPresetTine);

        this.props.onPresetChanged(presetName);
    };

    startRendering = () => {
        const renderVisualizer = () => {
            this.animationFrameRequest = requestAnimationFrame(() => {
                renderVisualizer();
            });
            this.visualizer.render();
        };
        renderVisualizer();
    };

    stopRendering = () => {
        window.cancelAnimationFrame(this.animationFrameRequest);
        this.animationFrameRequest = null;
    };

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {

        //TD
        //this.sourceNode.disconnect() ?
        // this.
        // if (this.visualizer) {
        //     this.visualizer.disconnectAudio(this.audioNode)
        // }
        this.stopRendering();
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        this.setState({w: w, h: h});
        console.log("w:", w, "h:", h);
        if (this.visualizer) {
            this.visualizer.setRendererSize(w, h);
        }
    };

    render() {
        return (
            <canvas
                ref={this.canvasRef}
                height={this.state.h}
                width={this.state.w}
            />
        );
    }
}


ButterChurnWrapped.props = {
    blendPresetTine: PropTypes.number,
    onPresetChanged: PropTypes.func,
    onInited: PropTypes.func
};

ButterChurnWrapped.defaultProps = {
    blendPresetTine: 10,
    onPresetChanged: () => {},
    onInited: () => {}
};

export default ButterChurnWrapped;
