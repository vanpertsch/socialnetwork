import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Form, FormControl } from 'react-bootstrap';

export default function FindPeople({ user_id }) {

    const [users, setUsers] = useState();
    const [term, setTerm] = useState("");



    useEffect(() => {

        fetch(`/newusers/id.json`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUsers(data);
            }).catch((err) => {
                console.log("err in newuser", err);
            });

    }, []);

    useEffect(() => {
        console.log(term);

        fetch(`/users/${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUsers(data);
            }).catch((err) => {
                console.log("err in fetch(`/users/${term}`)", err);
            });

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
                        <Col xs={6} md={3} key={user.id}>
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
