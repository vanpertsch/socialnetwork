import ReactDOM from "react-dom";
import Welcome from "./welcome";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import reducer from "./redux/reducer.js";
import App from './app';

import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

// const elem = (

// );

fetch('/user/id.json')
    .then(response => response.json())
    .then(data => {
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {

            ReactDOM.render(<Provider store={store}>
                <App user_id={data.userId} />
            </Provider>, document.querySelector("main"));
        }
    });
