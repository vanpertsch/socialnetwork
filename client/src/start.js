import ReactDOM from "react-dom";
import Welcome from "./welcome";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import 'bootstrap/dist/css/bootstrap.min.css';

import * as immutableState from "redux-immutable-state-invariant";
import reducer from "./redux/reducer.js";
import App from './app';


import { io } from 'socket.io-client';

import { init } from "./socket.js";

import { composeWithDevTools } from "redux-devtools-extension";

const socket = io();

socket.on('welcome', function (data) {
    console.log(data);
    socket.emit('thanks', {
        message: 'Thank you. It is great to be here.'
    });
});


const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default(), thunk))
);

// const elem = (

// );

// fetch('/user/id.json')
//     .then(response => response.json())
//     .then(data => {
//         if (!data.userId) {
//             ReactDOM.render(<Welcome />, document.querySelector("main"));
//         } else {


//         }
//     });


fetch('/user/id.json')
    .then(res => res.json())
    .then(({ userId }) => {
        if (!userId) {
            ReactDOM.render(<Welcome />, document.querySelector('main'));
        } else {
            init(store);
            const elem = (
                <Provider store={store} >
                    <App user_id={userId} />
                </Provider>
            );
            ReactDOM.render(elem, document.querySelector('main'));
        }
    });
