import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Tracks from "./scenes/tracks/Tracks";
import TrackItem from "./components/TrackList/TrackItem";

class App extends Component {


    constructor(props) {
        super(props);
        console.log("App()");
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <ul>
                            <li><Link to="/tracks">Tracks</Link></li>
                        </ul>

                        <hr/>

                        <Route path="/tracks" component={Tracks}/>
                        <Route path="/track/:_id" component={TrackItem}/>
                    </div>
                </Router>

            </div>
        );
    }
}

export default App;