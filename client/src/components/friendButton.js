import { useState, useEffect } from 'react';

export default function FriendButton(props) {

    const [buttonText, setButtonText] = useState("send friend request");

    useEffect(() => {

        fetch(`/friendshipstat/${props.otherProfileId}`)
            .then(res => res.json())
            .then(data => {
                console.log("friendshipstat", data);

                if (data && data.sender_id == props.otherProfileId) {
                    setButtonText("Accept friend request");
                }
                if (data && data.sender_id != props.otherProfileId) {
                    setButtonText("Cancel friend request");
                }
                if (data && data.accepted) {
                    setButtonText("unfriend");
                }
                if (data.message == "no request") {
                    setButtonText("send friend request");
                }
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
            data => console.log("fetch friendship", data)
        );

    }

    return (
        <div>
            <button onClick={handleChange}>{buttonText}</button>
        </div>
    )
}
