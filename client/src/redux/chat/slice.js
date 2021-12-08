
const ACTIONS = {
    RECEIVEALL: 'chat/receiveMessages',
    RECEIVEONE: 'chat/receiveMessage',

};

export default function chatReducer(messages = null, action) {

    if (action.type == ACTIONS.RECEIVEALL) {
        messages = action.payload.messages;
    }
    if (action.type == ACTIONS.RECEIVEONE) {
        messages = [action.payload.message, ...messages];
    }

    return messages;
}

export function chatMessagesReceived(messages) {
    console.log("test", messages);
    return {
        type: ACTIONS.RECEIVEALL,
        payload: { messages },
    };
}

export function chatMessageReceived(message) {
    console.log("got hier", message);
    return {
        type: ACTIONS.RECEIVEONE,
        payload: { message },
    };
}
