
const ACTIONS = {

    RECEIVEASYNC: 'user/receiveUser',
    UPDATEBIO: 'user/updateBio',
    UPDATEIMG: 'user/updateImg',
    REMOVEIMG: 'user/removeImg',
};

export default function userReducer(user = null, action) {

    if (action.type == ACTIONS.RECEIVEASYNC) {

        user = action.payload.user;
    }
    if (action.type == ACTIONS.UPDATEBIO) {

        return {
            ...user,
            bio: action.payload.bio
        };
    }
    if (action.type == ACTIONS.UPDATEIMG) {

        return {
            ...user,
            img_url: action.payload.imgUrl
        };
    }
    if (action.type == ACTIONS.REMOVEIMG) {

        return {
            ...user,
            img_url: action.payload.imgUrl
        };
    }


    return user;
}


export function receiveUser(user_id) {
    console.log("in slice recieve user");
    return async (dispatch) => {
        const data = await fetch(`/user/profile/${user_id}`).then(response => response.json());
        dispatch({
            type: ACTIONS.RECEIVEASYNC,
            payload: {
                user: data,
            },
        });
    };
}
export function updateProfileBio(bio) {

    return async (dispatch) => {
        dispatch({
            type: ACTIONS.UPDATEBIO,
            payload: { bio }
        });
    };
}
export function updateProfileImg(imgUrl) {

    return async (dispatch) => {
        dispatch({
            type: ACTIONS.UPDATEIMG,
            payload: { imgUrl }
        });
    };
}
export function removeProfileImg() {

    return async (dispatch) => {
        dispatch({
            type: ACTIONS.REMOVEIMG,
            payload: ""
        });
    };
}
