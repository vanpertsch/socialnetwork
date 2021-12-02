import { useState, useEffect } from 'react';

export default function FriendButton(props) {

    const [buttonText, setButtonText] = useState("send friend request");

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
            setButtonText("unfriend");
        }
        if (data && data.sender_id == id) {
            setButtonText("Accept friend request");
        }
        if (data && data.sender_id != id) {
            setButtonText("Cancel friend request");
        }
        if (data.message == "no request") {
            setButtonText("send friend request");
        }
    }

    return (
        <div>
            <button onClick={handleChange}>{buttonText}</button>
        </div>
    )
}
