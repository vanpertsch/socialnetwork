
const ACTIONS = {

    RECEIVEASYNC: 'users/receiveUsers',
    UPDATE: 'users/updateUsers',

};

export default function usersReducer(users = null, action) {

    if (action.type == ACTIONS.RECEIVEASYNC) {

        users = action.payload.users;
    }
    if (action.type == ACTIONS.UPDATE) {

        users = action.payload.users;
    }



    return users;
}


export function receiveUsers() {

    return async (dispatch) => {
        const data = await fetch(`/newusers/id.json`).then(response => response.json());
        dispatch({
            type: ACTIONS.RECEIVEASYNC,
            payload: {
                users: data,
            },
        });
    };
}

export function updateUsers(term) {

    return async (dispatch) => {
        const data = await fetch(`/users/${term}`).then(response => response.json());
        dispatch({
            type: ACTIONS.UPDATE,
            payload: {
                users: data,
            },
        });
    };
}
