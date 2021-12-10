import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Form, FormControl } from 'react-bootstrap';

import { useDispatch, useSelector } from "react-redux";
import { updateUsers, receiveUsers } from "./../redux/users/slice.js";


export default function FindPeople() {
    const dispatch = useDispatch();
    const [term, setTerm] = useState("");

    const users = useSelector(state => state?.users);

    useEffect(() => {

        dispatch(receiveUsers());
    }, []);

    useEffect(() => {
        if (term) {
            dispatch(updateUsers(term));
        }

    }, [term]);




    return (

        <>
            <div className="search">
                <Row>
                    <Col xs={6}>
                        <Form >
                            <FormControl
                                type="search"
                                placeholder="Search people"
                                className="me-2"
                                aria-label="Search"
                                onChange={(e) => setTerm(e.target.value)} name="search"
                            />

                        </Form>
                    </Col>

                </Row>
            </div>
            <div className="">
                <Row>
                    {users && users.map(user => (
                        <Col md={3} key={user.id}>
                            <Card>
                                <Link to={`/otherprofile/${user.id}`}>
                                    <Card.Img variant="top" className="profilepic-card" src={user.img_url || '/panda.svg'} alt={`${user.first} ${user.last}`} />
                                </Link>
                                <Card.Body>
                                    <Card.Title>
                                        <Link to={`/otherprofile/${user.id}`}>{user.first} {user.last} </Link>
                                    </Card.Title>

                                </Card.Body>
                            </Card>


                        </Col>
                    ))}
                </Row>
            </div>

            {/* <div>
                <input onChange={(e) => setTerm(e.target.value)} name="search" />
            </div> */}

        </>
    );

}
