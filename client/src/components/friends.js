import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveFriendsAndWannabes, receiveUsers, unfriend, acceptFriendRequest } from "./../redux/friends/slice.js";
import WannabeButton from './wannabeButton.js';
import { Row, Col, Card, Button, Alert } from 'react-bootstrap';

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

        // (async () => {
        //     const friendsAndWannabes = await fetch("/friends/friends-and-wannabes").then(
        //         res => res.json()
        //     );
        //     dispatch(receiveFriendsAndWannabes(friendsAndWannabes));
        // })();

        dispatch(receiveUsers());

    }, []);

    if (!(friends || wannabes)) {
        return null;
    }

    return (

        <>
            <style type="text/css">
                {`
    .a {
text-decoration: none;
    }


    `}
            </style>
            <div id="friendsAndWannabes">
                <div className="friends">
                    <h3>Your Friends</h3>
                    {
                        friends[0] ? (


                            <Row>
                                {friends && friends.map(friend => (
                                    <Col xs={6} md={3} key={friend.id}>
                                        <Card>
                                            <Link to={`/otherprofile/${friend.id}`}>
                                                <Card.Img variant="top" className="profilepic-card" src={friend.img_url || '/panda.svg'} alt={`${friend.first} ${friend.last}`} />
                                            </Link>
                                            <Card.Body>
                                                <Card.Title>
                                                    <Link to={`/otherprofile/${friend.id}`}>{friend.first} {friend.last} </Link>
                                                </Card.Title>

                                            </Card.Body>
                                            <Card.Footer>
                                                <Button variant="primary" onClick={
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
                                                }>{BUTTON.UNFRIEND}</Button>


                                            </Card.Footer>
                                        </Card>


                                    </Col>
                                ))}
                            </Row>


                        ) : <Alert key="info1" variant="info">
                            No friends so far.
                        </Alert>
                    }
                </div>
                <div className="wannabees">
                    <h3>Wannabees</h3>
                    {
                        wannabes[0] ? (


                            <Row>
                                {wannabes && wannabes.map(wannabe => (
                                    <Col xs={6} md={3} key={wannabe.id}>
                                        <Card>
                                            <Link to={`/otherprofile/${wannabe.id}`}>
                                                <Card.Img variant="top" className="profilepic-card" src={wannabe.img_url || '/panda.svg'} alt={`${wannabe.first} ${wannabe.last}`} />
                                            </Link>
                                            <Card.Body>
                                                <Card.Title>
                                                    <Link to={`/otherprofile/${wannabe.id}`}>{wannabe.first} {wannabe.last} </Link>
                                                </Card.Title>

                                            </Card.Body>
                                            <Card.Footer>
                                                <Button onClick={
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
                                                }>{BUTTON.ACCEPT}</Button>
                                                <Button onClick={
                                                    async e => {
                                                        const resp = await fetch('/friendship', {
                                                            method: 'POST',
                                                            headers: {
                                                                'Content-Type': 'application/json'
                                                            },
                                                            body: JSON.stringify({
                                                                buttonText: `${BUTTON.REJECT}`,
                                                                otherProfile_id: wannabe.id
                                                            })
                                                        }).then(res => res.json());

                                                        if (resp) {
                                                            dispatch(unfriend(wannabe.id));
                                                        }
                                                    }
                                                }>{BUTTON.REJECT}</Button>
                                            </Card.Footer>
                                        </Card>


                                    </Col>
                                ))}
                            </Row>



                        ) : <Alert key="info" variant="info">
                            No wannabes so far.
                        </Alert>
                    }
                </div>
            </div >
        </>
    );
}
