import ReactDOM from "react-dom";

//redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import * as immutableState from "redux-immutable-state-invariant";
import reducer from "./redux/reducer.js";
import { composeWithDevTools } from "redux-devtools-extension";


//componenets
import App from './app';
import Welcome from "./welcome";

//react bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//socket io import init and call it if the user is logged in, passing to it the Redux store. Other modules that need the socket object can import it. Make sure that init is called before any attempts to use the socket object are made.
import { init } from "./socket.js";

//codesnippet example: use socket io in start.js. In this App we do not communicate on welcome and do not need it at this point

// import { io } from 'socket.io-client';
// const socket = io();
// socket.on('welcome', function (data) {
//     console.log(data);
//     socket.emit('thanks', {
//         message: 'Thank you. It is great to be here.'
//     });
// });

//initialize store object and give it to the redux <Provider> component. With that you can connect other components to the global state
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default(), thunk))
);


fetch('/user/id.json')
    .then(res => res.json())
    .then(({ userId }) => {
        if (!userId) {
            ReactDOM.render(<Welcome />, document.querySelector('main'));
        } else {

            //codesnippet: example withoutsocket io:

            // ReactDOM.render(<Provider store={store}>
            //     <App user_id={userId} />
            // </Provider>, document.querySelector("main"));

            init(store);
            const elem = (
                <Provider store={store} >
                    <App user_id={userId} />
                </Provider>
            );
            ReactDOM.render(elem, document.querySelector('main'));
        }
    });
