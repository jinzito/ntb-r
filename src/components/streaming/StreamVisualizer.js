import React, { Component } from "react"
import butterchurn from 'butterchurn';
import butterchurnPresets from 'butterchurn-presets';

class StreamVisualizer extends Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.audioRef = React.createRef();
        this.divRef = React.createRef();
        this.state = {fullscreen: false, isPlaying: false, w:100, h:100};
    }

    onCanPlay = () => {

        console.log("onCanPlay");

        const canvas = this.canvasRef.current;

        const audioContext = new AudioContext();
        this.visualizer = butterchurn.createVisualizer(audioContext, canvas, {
            width: window.innerWidth,
            height: window.innerHeight,
            pixelRatio: window.devicePixelRatio || 1,
            textureRatio: 1
        });


        // this.audioNode = new Audio();
        // this.audioNode.crossOrigin = "anonymous"; //
        // this.audioNode.src = "http://radio.ingi.by/stream";
        this.audioNode = this.audioRef.current;

        let sourceNode = null;
        let delayedAudible = null;
        // this.audioNode.addEventListener("canplay", () => {
            sourceNode = audioContext.createMediaElementSource(this.audioNode);
            delayedAudible = audioContext.createDelay();
            delayedAudible.delayTime.value = .26;
            let gainAudible = audioContext.createGain();
            gainAudible.gain.value = 1;
            sourceNode.connect(delayedAudible);
            delayedAudible.connect(gainAudible);
            gainAudible.connect(audioContext.destination),
        this.visualizer.connectAudio(delayedAudible);
            this.audioNode.play();
        // });

        // load a preset

        const presets = butterchurnPresets.getPresets();
        console.log("len", presets.length);
        const preset = presets["Flexi, martin + geiss - dedicated to the sherwin maxawow"];
        // const preset = presets["$$$ Royal - Mashup (431)"];


        this.visualizer.loadPreset(preset, 10); // 2nd argument is the number of seconds to blend presets

        // resize visualizer
        //visualizer.setRendererSize(1600, 1200);

        // setInterval(() => {
        //     visualizer.render();
        // }, 1000/30);
        //
        const renderVisualizer = () => {
            this.animationFrameRequest = requestAnimationFrame(() => {
                renderVisualizer();
            })
            this.visualizer.render();
        }
        renderVisualizer();
    }

    onPauseInternal = () => {

        console.log("")
        window.cancelAnimationFrame(this.animationFrameRequest);
        this.animationFrameRequest = null

        // this.sourceNode.stop(0),
        //     this.sourceNode.disconnect(),
        this.audioNode.pause();
    }


    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        this.setState({w:w, h:h});
        if (this.visualizer) {
            this.visualizer.setRendererSize(w, h);
        }
    }

    render() {
        const canvasStyle = {
            position:"fixed",
            left:"0",
            top:"0",
            width:"100%",
            height:"100hv",
            zIndex:-1
        }

        return (
            <div style={{background:"yellow"}} style={canvasStyle} ref={this.divRef} >
                {/*<button onClick={this.onPlayInternal}>play internal</button>*/}
                {/*<button onClick={this.onPauseInternal}>pause</button>*/}
                {/*<button onClick={this.onFullscreen}>fs</button>*/}
                <audio
                    // autoPlay={true}
                    ref={this.audioRef}
                    src={"http://radio.ingi.by/stream"}
                    crossOrigin={"anonymous"}
                />
                <canvas
                    ref={this.canvasRef}
                    onClick={this.onCanPlay}
                    height={this.state.h}
                    width={this.state.w}
                ></canvas>
            </div>
        );
    }
}

export default StreamVisualizer;
