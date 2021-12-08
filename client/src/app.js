import { Component } from 'react';
import { BrowserRouter, Route, Link, NavLink, Redirect } from 'react-router-dom';

import { CSSTransition } from 'react-transition-group';
import { Container, Navbar, Nav } from 'react-bootstrap';


import Profilepic from './components/profilepic';
import Uploader from './components/uploalder';
import Profile from './components/profile';
import FindPeople from './components/findPeople';
import OtherProfile from './components/otherProfile';
import Friends from './components/friends';
import Chat from './components/chat';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
        };
        // this.toggleUploader = this.toggleUploader.bind(this);
        this.updateProfileImg = this.updateProfileImg.bind(this);
        this.updateProfileBio = this.updateProfileBio.bind(this);

    }
    async componentDidMount() {
        console.log("app component did mount", this.props.user_id);

        //fetch data from currently loggedIn user

        try {
            const res = await fetch(`/user/profile/${this.props.user_id}`);
            const data = await (res.json());

            return this.setState({
                email: data.email,
                first: data.first,
                last: data.last,
                img_url: data.img_url,
                bio: data.bio
            });

        } catch (err) {
            console.log("err in did mount", err);
            this.setState({
                error: true
            });
        };

    }

    updateProfileImg(val) {
        this.setState({
            img_url: val
        });
    }
    updateProfileBio(val) {
        this.setState({
            bio: val
        });
    }

    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }


    render() {
        console.log("bio App", this.state.bio);
        return (
            <>
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

                                >
                                    <img
                                        className='logo rotate'
                                        src="/network.svg"
                                        alt="commonground logo"
                                    />
                                </Nav.Link>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav" >
                                <Nav className="ml-auto" >
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
                                    first={this.state.first}
                                    last={this.state.last}
                                    imageUrl={this.state.img_url}
                                    toggleUploader={() => this.toggleUploader()}
                                    imgSize="profilepic-nav"
                                />
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <Container>
                        <div id="app">
                            <Route exact path="/users">
                                <FindPeople user_id={this.props.user_id} />
                            </Route>

                            <Route exact path="/friends">
                                <Friends user_id={this.props.user_id} />
                            </Route>
                            <Route exact path="/otherprofile/:id">
                                <OtherProfile />
                            </Route>
                            <Route exact path="/chat">
                                <Chat user_id={this.props.user_id} />
                            </Route>

                            <Route exact path="/">
                                <Profile
                                    first={this.state.first}
                                    last={this.state.last}
                                    imageUrl={this.state.img_url}
                                    bio={this.state.bio}
                                    email={this.state.email}
                                    toggleUploader={() => this.toggleUploader()}
                                    updateProfileBio={this.updateProfileBio}
                                />
                            </Route>

                            {this.state.uploaderIsVisible && <Uploader show={this.state.uploaderIsVisible} email={this.state.email} updateProfileImg={this.updateProfileImg} toggleUploader={() => this.toggleUploader()} />}
                        </div>
                    </Container>
                </BrowserRouter>
            </>
        );
    }
}

