import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import StreamVisualizer from "./components/streaming/StreamVisualizer";
import StreamPanel from "./components/StreamPanel";

class App extends Component {


    constructor(props) {
        super(props);
        this.audioRef = React.createRef();
    }

    render() {

        return (
            <div className="App" style={{height: "100vh", width: "100vw", overflowY: "hidden"}}>
                <audio
                    autoPlay={true}
                    ref={this.audioRef}
                    src={"http://radio.ingi.by/stream"}
                    crossOrigin={"anonymous"}
                />
                <Router>
                    {/*<Route path="/tracks/:_id" component={TrackDetails}/>*/}
                    {/*<Route path="/pc/" component={PresetConverter}/>*/}
                    {/*<Route path="/" component={Panel} audioRef={this.audioRef} aa={true}/>*/}
                    <Route
                        path="/"
                        render={(routeProps) => (
                           <StreamPanel {...routeProps} audioRef={this.audioRef}>
                               <StreamVisualizer audioRef={this.audioRef} />
                           </StreamPanel>
                        )}
                    />
                </Router>
            </div>
        );
    }
}

export default App;
