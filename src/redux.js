import { infoReducer, streamReducer } from "./scenes/Info";
import { routerMiddleware, routerReducer } from "react-router-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

// configuring router and router middleware
export const history = createHistory();
const routerHistoryMiddleware = routerMiddleware(history);

export const store = createStore(
    combineReducers({
        router: routerReducer,
        info: infoReducer,
        stream: streamReducer
    }),
    composeEnhancers(
        applyMiddleware(
            thunk,
            routerHistoryMiddleware
        )
    )
);
