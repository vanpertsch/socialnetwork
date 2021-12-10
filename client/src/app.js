import { useEffect, useState } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { receiveUser } from "./redux/user/slice.js";

import { Container, Navbar, Nav, Alert } from 'react-bootstrap';


import Profilepic from './components/profilepic';
import Uploader from './components/uploalder';
import Profile from './components/profile';
import FindPeople from './components/findPeople';
import OtherProfile from './components/otherProfile';
import Friends from './components/friends';
import Chat from './components/chat';

export default function App(props) {
    const dispatch = useDispatch();

    const [uploaderIsVisible, setUploaderIsVisible] = useState(false);

    const user = useSelector(state => state?.user);

    useEffect(() => {
        dispatch(receiveUser(props.user_id));

    }, []);



    function toggleUploader() {
        setUploaderIsVisible(!uploaderIsVisible);
    }


    return (
        <>
            {
                user ? (
                    <BrowserRouter>
                        <Navbar bg="light" expand="lg">
                            <Container>
                                <Navbar.Brand>
                                    <Nav.Link
                                        key="/"
                                        to="/"
                                        as={NavLink}
                                        activeclassname="active"
                                        exact

                                    ><span>
                                            NETW
                                        </span>
                                        <img
                                            className='logo rotate'
                                            src="/network.svg"
                                            alt="commonground logo"
                                        />
                                        <span>
                                            RK
                                        </span>
                                    </Nav.Link>
                                </Navbar.Brand>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav" >
                                    <Nav className="mx-auto" >
                                        <Nav.Link
                                            key="/users"
                                            as={NavLink}
                                            to="/users"
                                            activeclassname="active"

                                        >
                                            Find People
                                        </Nav.Link>

                                        <Nav.Link
                                            key="/friend"
                                            as={NavLink}
                                            to="/friends"
                                            activeClassName="active"

                                        >
                                            Friends
                                        </Nav.Link>
                                        <Nav.Link
                                            key="/myprofile"
                                            as={NavLink}
                                            to="/"
                                            activeclassname="active"
                                            exact

                                        >
                                            My Profile
                                        </Nav.Link>
                                        <Nav.Link
                                            key="/chat"
                                            as={NavLink}
                                            to="/chat"
                                            activeclassname="active"
                                            exact

                                        >
                                            Chat
                                        </Nav.Link>

                                        <a className="nav-link" href="/logout">Logout</a>

                                    </Nav>
                                    <Profilepic
                                        toggleUploader={() => toggleUploader()}
                                        imgSize="profilepic-nav"
                                    />
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                        <Container>
                            <div id="app">
                                <Route exact path="/users">
                                    <FindPeople user_id={props.user_id} />
                                </Route>

                                <Route exact path="/friends">
                                    <Friends user_id={props.user_id} />
                                </Route>
                                <Route exact path="/otherprofile/:id">
                                    <OtherProfile />
                                </Route>
                                <Route exact path="/chat">
                                    <Chat user_id={props.user_id} />
                                </Route>

                                <Route exact path="/">
                                    <Profile
                                        toggleUploader={() => toggleUploader()}
                                    />
                                </Route>

                                {uploaderIsVisible && <Uploader show={uploaderIsVisible} toggleUploader={() => toggleUploader()} />}
                                {/* <footer> <Container>coded with 🦞</Container></footer> */}
                            </div>
                        </Container>
                    </BrowserRouter>
                ) : <Alert key="info1" variant="info">
                    No User logged in
                </Alert>

            }
        </>
    );
}


