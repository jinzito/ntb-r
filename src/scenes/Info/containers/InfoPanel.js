import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon, Label, Segment, Sidebar } from "semantic-ui-react";
import { loadInfo } from "../services/InfoActions";
import { doChangePresetRandom } from "../services/VisualizerActions";
import { doPauseStream, doPlayStream } from "../services/StreamActions";


class StreamPanel extends Component {

    constructor(props) {
        super(props);
        this.onPlayPauseClick = this.onPlayPauseClick.bind(this);
    }

    state = {visible: true};

    toggleVisibility = () => this.setState({visible: !this.state.visible});

    onPlayPauseClick = () => {
        if (this.props.isStreamLoading) {
            return;
        }
        this.props.isStreamPlaying ? this.props.doPauseStream() : this.props.doPlayStream();
    };

    componentDidMount() {
        this.props.loadInfo();
    }

    render() {
        const {visible} = this.state;
        const buttonStyle = {marginBottom: "2px"};

        return (

            <div>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Segment} animation='overlay' direction='top' visible={visible} style={{opacity: 0.9}}>
                        <Button icon
                                loading={this.props.isStreamLoading}
                                disabled={this.props.isStreamLoading}
                                style={buttonStyle}
                                onClick={this.onPlayPauseClick}
                        >
                            <Icon name={this.props.isStreamPlaying ? "pause" : "play"}/>
                        </Button>
                        <Button as='div'
                                labelPosition='right'
                                disabled={this.props.isStreamLoading}
                                style={buttonStyle}
                        >
                            <Button icon>
                                <Icon name='music'/>
                            </Button>
                            <Label as='a' basic
                                   pointing='left'>{this.props.onAirTitle ? this.props.onAirTitle : "---"}</Label>
                        </Button>
                        <Button as='div'
                                labelPosition='right'
                                disabled={this.props.isStreamLoading}
                                style={buttonStyle}
                        >
                            <Button icon>
                                <Icon name='video'/>
                            </Button>
                            <Label as='a' basic pointing='left'>
                                {this.props.currentPresetName ? this.props.currentPresetName : "---"}
                            </Label>
                            <Label as='a' basic pointing='left' onClick={this.props.doChangePresetRandom}>
                                Next
                            </Label>
                        </Button>
                    </Sidebar>
                    <Sidebar.Pusher onClick={this.toggleVisibility}>
                        {this.props.children}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isStreamLoading: state.stream.isLoading,
        isStreamPlaying: state.stream.isPlaying,
        onAirTitle: state.info.onAirTitle,
        currentPresetName: state.visualizer.currentPresetName
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadInfo: () => dispatch(loadInfo()),
        doChangePresetRandom: () => dispatch(doChangePresetRandom()),
        doPauseStream: () => dispatch(doPauseStream()),
        doPlayStream: () => dispatch(doPlayStream())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StreamPanel);
