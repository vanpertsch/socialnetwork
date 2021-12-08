import { Component } from 'react';
import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom';

import { CSSTransition } from 'react-transition-group';
import { Container, Navbar, Nav } from 'react-bootstrap';

import Profilepic from './components/profilepic';
import Uploader from './components/uploalder';
import Profile from './components/profile';
import FindPeople from './components/findPeople';
import OtherProfile from './components/otherProfile';
import Friends from './components/friends';

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
                    <Navbar bg="light">
                        <Nav className="mx-auto">
                            <img
                                className='logo'
                                src="/logo.png"
                                alt="commonground logo"
                            />
                            <Nav.Link
                                key="/users"
                                as={NavLink}
                                to="/users"
                                // activeClassName="active"
                                exact
                            >
                                Find People
                            </Nav.Link>
                            <Nav.Link
                                key="/"
                                as={NavLink}
                                to="/"
                                // activeClassName="active"
                                exact
                            >
                                My Profile
                            </Nav.Link>
                            <Nav.Link
                                key="/friend"
                                as={NavLink}
                                to="/friends"
                                // activeClassName="active"
                                exact
                            >
                                Find People
                            </Nav.Link>



                            <Profilepic
                                first={this.state.first}
                                last={this.state.last}
                                imageUrl={this.state.img_url}
                                toggleUploader={() => this.toggleUploader()}
                                imgSize="profilepic-nav"
                            />
                        </Nav>
                    </Navbar>

                    <Route exact path="/users">
                        <FindPeople user_id={this.props.user_id} />
                    </Route>

                    <Route exact path="/friends">
                        <Friends user_id={this.props.user_id} />
                    </Route>
                    <Route exact path="/otherprofile/:id">
                        <OtherProfile />
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

                    {this.state.uploaderIsVisible && <Uploader email={this.state.email} updateProfileImg={this.updateProfileImg} toggleUploader={() => this.toggleUploader()} />}
                </BrowserRouter>
            </>
        );
    }
}


import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { Container, Navbar, Nav } from 'react-bootstrap'
import Home from './pages/home'
import About from './pages/about'
import Contact from './pages/contact'
import './styles.css'

const routes = [
    { path: '/', name: 'Home', Component: Home },
    { path: '/about', name: 'About', Component: About },
    { path: '/contact', name: 'Contact', Component: Contact },
]

function Example() {
    return (
        <Router>
            <>
                <Navbar bg="light">
                    <Nav className="mx-auto">
                        {routes.map(route => (
                            <Nav.Link
                                key={route.path}
                                as={NavLink}
                                to={route.path}
                                activeClassName="active"
                                exact
                            >
                                {route.name}
                            </Nav.Link>
                        ))}
                    </Nav>
                </Navbar>
                <Container className="container">
                    {routes.map(({ path, Component }) => (
                        <Route key={path} exact path={path}>
                            {({ match }) => (
                                <CSSTransition
                                    in={match != null}
                                    timeout={300}
                                    classNames="page"
                                    unmountOnExit
                                >
                                    <div className="page">
                                        <Component />
                                    </div>
                                </CSSTransition>
                            )}
                        </Route>
                    ))}
                </Container>
            </>
        </Router>
    )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<Example />, rootElement)
