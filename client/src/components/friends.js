import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveFriendsAndWannabes, unfriend, acceptFriendRequest } from "./../redux/friends/slice.js";
import WannabeButton from './wannabeButton.js';

import { BUTTON } from "../../../helper/constants.js";


export default function Friends() {
    const dispatch = useDispatch();

    const friends = useSelector(
        state => state.friendsAndWannabes && state.friendsAndWannabes.filter(
            fw => fw.accepted
        )
    );

    const wannabes = useSelector(
        state => state.friendsAndWannabes && state.friendsAndWannabes.filter(
            fw => !fw.accepted
        )
    );


    useEffect(() => {

        (async () => {
            const friendsAndWannabes = await fetch("/friends/friends-and-wannabes").then(
                res => res.json()
            );
            dispatch(receiveFriendsAndWannabes(friendsAndWannabes));
        })();

    }, []);

    if (!(friends || wannabes)) {
        return null;
    }

    return (


        <div id="friendsAndWannabes">
            {
                friends[0] ? (
                    <div className="friends">

                        {friends && friends.map(friend => (
                            <div key={friend.id} >
                                <Link to={`/otherprofile/${friend.id}`}>
                                    <img className="profilepic-lg" src={friend.img_url || '/panda.svg'} alt={`${friend.first} ${friend.last}`
                                    } />
                                    <p >{friend.first} {friend.last}</p>

                                </Link>
                                <button onClick={
                                    async e => {
                                        const resp = await fetch('/friendship', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                buttonText: `${BUTTON.UNFRIEND}`,
                                                otherProfile_id: friend.id
                                            })
                                        }).then(res => res.json());

                                        if (resp) {
                                            dispatch(unfriend(friend.id));
                                        }
                                    }
                                }>{BUTTON.UNFRIEND}</button>
                                <button onClick={
                                    async e => {
                                        const resp = await fetch('/friendship', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                buttonText: `${BUTTON.REJECT}`,
                                                otherProfile_id: friend.id
                                            })
                                        }).then(res => res.json());

                                        if (resp) {
                                            dispatch(unfriend(friend.id));
                                        }
                                    }
                                }>{BUTTON.REJECT}</button>

                            </div>
                        ))}


                    </div>

                ) : 'No Friends'
            }

            {
                wannabes[0] ? (
                    <div className="wannabees">
                        {wannabes && wannabes.map(wannabe => (
                            <div key={wannabe.id} >
                                <Link to={`/otherprofile/${wannabe.id}`}>
                                    <img className="profilepic-lg" src={wannabe.img_url || '/panda.svg'} alt={`${wannabe.first} ${wannabe.last}`
                                    } />
                                    <p >{wannabe.first} {wannabe.last}</p>

                                </Link>
                                <button onClick={
                                    async e => {
                                        const resp = await fetch('/friendship', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                buttonText: `${BUTTON.ACCEPT}`,
                                                otherProfile_id: wannabe.id
                                            })
                                        }).then(res => res.json());
                                        if (resp) {
                                            dispatch(acceptFriendRequest(wannabe.id));
                                        }
                                    }
                                }>{BUTTON.ACCEPT}</button>
                            </div>
                        ))}

                    </div>
                ) : 'No Wannabees'
            }
            <nav>
                <Link to="/hot">See who&apos;s hot</Link>
                <Link to="/not">See who&apos;s not</Link>
            </nav>
        </div >

    );
}
