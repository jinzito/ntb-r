import React, { Component } from "react";
import { Route, Router } from "react-router-dom";
import StreamVisualizer from "./components/streaming/StreamVisualizer";
import StreamPanel from "./scenes/Info/containers/InfoPanel";
import { Provider } from "react-redux";
import {store, history} from "./redux"
import Audio from "./scenes/Info/containers/Audio"

class App extends Component {


    constructor(props) {
        super(props);
        this.audioRef = React.createRef();
    }

    render() {

        return (
            <Provider store={store}>
                <div className="App" style={{height: "100vh", width: "100vw", overflowY: "hidden"}}>
                    <Audio
                        autoPlay={true}
                        ref={this.audioRef}
                        src={"http://radio.ingi.by/stream"}
                        crossOrigin={"anonymous"}
                    />
                    <Router history={history}>
                        {/*<Route path="/tracks/:_id" component={TrackDetails}/>*/}
                        {/*<Route path="/pc/" component={PresetConverter}/>*/}
                        {/*<Route path="/" component={Panel} audioRef={this.audioRef} aa={true}/>*/}
                        <Route
                            path="/"
                            render={(routeProps) => (
                                <StreamPanel {...routeProps}>
                                    <StreamVisualizer audioRef={this.audioRef}/>
                                </StreamPanel>
                            )}
                        />
                    </Router>
                </div>
            </Provider>
        );
    }
}

export default App;
