import React, { Component } from "react";
import { Button, Header, Icon, Input, Segment, Sidebar, Divider, Item, Label, Loader } from "semantic-ui-react";
import {connect} from 'react-redux';
import * as actions from '../services/InfoActions';

class StreamPanel extends Component {

    constructor(props) {
        super(props);
    }

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
                                Spirit Kinnection by Chlorophil | Mixcloud
                            </Label>
                            <Label as='a' basic pointing='left'>
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
        onAirTitle: state.info.onAirTitle
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadInfo: () => {
            dispatch(actions.loadInfo())
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StreamPanel)
