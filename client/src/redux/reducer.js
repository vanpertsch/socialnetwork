import { combineReducers } from "redux";
import friendsReducer from "./friends/slice.js";
import chatReducer from "./chat/slice.js";
import userReducer from "./user/slice.js";
import usersReducer from "./users/slice.js";

const rootReducer = combineReducers({
    friendsAndWannabes: friendsReducer,
    messages: chatReducer,
    user: userReducer,
    users: usersReducer
});

export default rootReducer;

