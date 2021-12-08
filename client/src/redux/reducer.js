import { combineReducers } from "redux";
import friendsReducer from "./friends/slice.js";
import chatReducer from "./chat/slice.js";

const rootReducer = combineReducers({
    friendsAndWannabes: friendsReducer,
    messages: chatReducer
});

export default rootReducer;

