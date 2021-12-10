
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import Registration from './components/welcome/registration';
import Login from './components/welcome/login';
import ResetPassword from './components/welcome/reset-password';
import { Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Welcome() {
    return (
        <BrowserRouter>

            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>
                        <Nav.Link
                            key="/"
                            to="/"
                            as={NavLink}
                            activeclassname="active"
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


                </Container>
            </Navbar>


            <Container>


                <div id="welcome">

                    {/* <img className='logo-lg' src="/network.svg" alt="Logo"></img> */}


                    <Route exact path="/">
                        <Registration />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/password/reset">
                        <ResetPassword />
                    </Route>

                </div>
            </Container>
        </BrowserRouter>
    );
}
