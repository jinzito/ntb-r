import React, { Component } from "react";
import { Button, Header, Icon, Input, Segment, Sidebar, Divider, Item, Label } from "semantic-ui-react";

class StreamPanel extends Component {

    constructor(props) {
        super(props);
        console.log(":::", props);
    }

    state = {visible: true};

    toggleVisibility = () => this.setState({visible: !this.state.visible});

    render() {
        const {visible} = this.state;
        return (

            <div>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar  as={Segment} animation='overlay' direction='top' visible={visible}>
                        <Button icon >
                            <Icon name="play"/>
                        </Button>
                        <Button as='div' labelPosition='right'>
                            <Button icon>
                                <Icon name='music' />
                            </Button>
                            <Label as='a' basic pointing='left'>
                                Spirit Kinnection by Chlorophil | Mixcloud
                            </Label>
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

export default StreamPanel;
