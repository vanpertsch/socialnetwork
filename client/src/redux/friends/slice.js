
const ACTIONS = {
    RECEIVE: 'friends/receiveFriendsAndWannabes',
    UNFRIEND: 'friends/unfriend',
    ACCEPT: 'friends/acceptFriendRequest',
    REJECT: 'friends/rejectFriendRequest'
};

export default function friendsReducer(friendsAndWannabes = null, action) {

    if (action.type == ACTIONS.RECEIVE) {

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

        // The function you pass to map should return the object it is passed as its first argument unless that object's id matches the id in the action's payload.If that's the case, you want to clone the object, set the clone's accepted property to true, and finally return the clone.

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
