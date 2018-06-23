import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon, Label, Segment, Sidebar } from "semantic-ui-react";
import { loadInfo } from "../services/InfoActions";
import {doChangePresetRandom} from "../services/VisualizerActions"


class StreamPanel extends Component {

    state = {visible: true};

    toggleVisibility = () => this.setState({visible: !this.state.visible});

    componentDidMount() {
        this.props.loadInfo();
    }

    render() {
        const {visible} = this.state;

        return (

            <div>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar  as={Segment} animation='overlay' direction='top' visible={visible}>
                        <Button icon loading={this.props.isStreamLoading} >
                            <Icon name="play"/>
                        </Button>
                        <Button as='div' labelPosition='right'>
                            <Button icon>
                                <Icon name='music' />
                            </Button>
                            <Label as='a' basic pointing='left'>{this.props.onAirTitle ? this.props.onAirTitle : "---"}</Label>
                        </Button>
                        <Button as='div' labelPosition='right'>
                            <Button icon>
                                <Icon name='video' />
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
        onAirTitle: state.info.onAirTitle,
        currentPresetName: state.visualizer.currentPresetName
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadInfo: () => dispatch(loadInfo()),
        doChangePresetRandom: () => dispatch(doChangePresetRandom())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StreamPanel)
