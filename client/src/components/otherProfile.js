import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import FriendButton from './friendButton.js';



export default function OtherProfile() {
    const [user, setUser] = useState();
    const [error, setError] = useState();
    const { id } = useParams();
    const history = useHistory();


    console.log("history:", history);
    console.log("id:", id);
    console.log("user:", user);

    useEffect(() => {

        fetch(`/api/otherprofile/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUser(data);
                if (data.message == "redirect user") {
                    history.push("/");
                }
                if (data.error) {
                    setError(true);
                }


            }).catch((err) => {
                console.log("err in did mount", err);
            });



    }, []);

    return (
        <div>
            {error && <div> Sorry. No user found</div>}
            {!error && user &&
                <div key={user.id}>
                    <img className="profilepic-lg" src={user.img_url || '/panda.svg'} alt={`${user.first} ${user.last}`} />
                    <h1>{user.first} {user.last}</h1>
                    <p>{user.bio}</p>
                    {!error && < FriendButton otherProfileId={user.id} />}
                </div>
            }

        </div>
    )
}

