import { useState, useEffect } from 'react'
import { BUTTON } from "../../../helper/constants.js";
import { Button } from 'react-bootstrap';


export default function FriendButton(props) {

    const [buttonText, setButtonText] = useState(BUTTON.SEND);

    useEffect(() => {

        fetch(`/friendshipstat/${props.otherProfileId}`)
            .then(res => res.json())
            .then(data => {
                console.log("friendshipstat", data);

                evalFriendship(data, props.otherProfileId);
            }).catch((err) => {
                console.log("err in fetch freindshipstat", err);
            });

    }, []);


    const handleChange = () => {
        fetch('/friendship', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                buttonText: buttonText,
                otherProfile_id: props.otherProfileId
            })
        }).then(
            response => response.json()
        ).then(
            data => {
                console.log("fetch friendship", data);
                evalFriendship(data, props.otherProfileId);
            }

        );

    }

    const evalFriendship = (data, id) => {
        if (data && data.accepted) {
            setButtonText(BUTTON.UNFRIEND);
        }
        if (data && data.sender_id == id) {
            setButtonText(BUTTON.ACCEPT);
        }
        if (data && data.sender_id != id) {
            setButtonText(BUTTON.CANCEL);
        }
        if (data.message == "no request") {
            setButtonText(BUTTON.SEND);
        }
    }

    return (
        <div>
            <Button variant="primary" onClick={handleChange}>{buttonText}</Button>
        </div>
    )
}
