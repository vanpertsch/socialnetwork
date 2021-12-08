
const ACTIONS = {
    RECEIVE: 'friends/receiveFriendsAndWannabes',
    UNFRIEND: 'friends/unfriend',
    ACCEPT: 'friends/acceptFriendRequest',
    REJECT: 'friends/rejectFriendRequest',
    RECEIVEASYNC: 'friends/receiveFriends',
};

export default function friendsReducer(friendsAndWannabes = null, action) {

    // if (action.type == ACTIONS.RECEIVE) {

    //     friendsAndWannabes = action.payload.friendsAndWannabes;
    // }
    if (action.type == ACTIONS.RECEIVEASYNC) {

        friendsAndWannabes = action.payload.friendsAndWannabes;
    }
    if (action.type == ACTIONS.UNFRIEND) {

        friendsAndWannabes = friendsAndWannabes.filter(
            char => char.id != action.payload.id
        );
    }
    if (action.type == ACTIONS.REJECT) {

        friendsAndWannabes = friendsAndWannabes.filter(
            char => char.id != action.payload.id
        );
    }

    if (action.type == ACTIONS.ACCEPT) {

        friendsAndWannabes = friendsAndWannabes.map(
            char => {
                console.log("faw accept", char.id, action.payload.id);
                if (char.id != action.payload.id) {
                    return char;
                } else {
                    return {
                        ...char,
                        accepted: true
                    };
                }
            }
        )
    }



    return friendsAndWannabes;
}

export function receiveFriendsAndWannabes(friendsAndWannabes) {
    return {
        type: ACTIONS.RECEIVE,
        payload: { friendsAndWannabes },
    };
}

export function unfriend(id) {
    return {
        type: ACTIONS.UNFRIEND,
        payload: { id }
    };
}
export function rejectFriendRequest(id) {
    return {
        type: ACTIONS.REJECT,
        payload: { id }
    };
}

export function acceptFriendRequest(id) {
    return {
        type: ACTIONS.ACCEPT,
        payload: { id }
    };
}

export function receiveUsers() {
    return async (dispatch) => {
        const data = await fetch('/friends/friends-and-wannabes').then(response => response.json());
        dispatch({
            type: ACTIONS.RECEIVEASYNC,
            payload: {
                friendsAndWannabes: data,
            },
        });
    };
}
