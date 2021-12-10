import { Component } from 'react';
import { Link } from 'react-router-dom';

import { Form, Button, Alert, Row, Col, Stack } from 'react-bootstrap';

export default class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stage: 1
        };
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    submitStage1() {
        fetch('/password/reset/start', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
            })
        }).then(
            res => res.json()
        ).then(
            data => {
                console.log(data);
                if (data.success) {
                    //a user should not go back to register again. the url is no longer in location history
                    // location.replace('/');
                    this.setState({
                        stage: 2
                    }, () => console.log("submitStage1", this.state));
                } else {
                    //this.state runs asynchronous. to see the change we have to pass a cb function
                    this.setState({
                        error: true
                    }, () => console.log("submitStage1", this.state));
                }
            }
        );
    }
    submitStage2() {
        fetch('/password/reset/confirm', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                code: this.state.code,
                password: this.state.password,
            })
        }).then(
            res => res.json()
        ).then(
            data => {
                console.log(data);
                if (data.success) {
                    //a user should not go back to register again. the url is no longer in location history
                    // location.replace('/');
                    this.setState({
                        stage: 3
                    });
                } else {
                    //this.state runs asynchronous. to see the change we have to pass a cb function
                    this.setState({
                        error: true
                    }, () => console.log(this.state));
                }
            }
        );
    }
    render() {
        return (
            <div className='section'>

                {this.state.error && <Alert variant="error">Something went wrong. Please try again</Alert>}

                {this.state.stage == 1 &&

                    <Row>

                        <Col md={6}>
                            <p>Please enter the email address with wich you registered. We will send you an email with further information</p>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={(e) => this.handleChange(e)} name="email" />
                            </Form.Group>
                            <Button onClick={() => this.submitStage1()}>submit</Button>
                        </Col>
                    </Row>

                }
                {this.state.stage == 2 &&

                    <Row>

                        <Col md={6}>
                            <p>Please enter the code you recieved per mail</p>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Code</Form.Label>
                                <Form.Control type="text" placeholder="Enter code" onChange={(e) => this.handleChange(e)} name="code" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e) => this.handleChange(e)} name="password" />
                            </Form.Group>
                            <Button onClick={() => this.submitStage2()}>submit</Button>
                        </Col>
                    </Row>

                }
                {this.state.stage == 3 &&

                    <Row>
                        <Col md={6}>
                            <h3>Success!</h3>
                            <Link to="/login"><Button variant="primary">Click here to Log in!</Button></Link>
                        </Col>
                    </Row>

                }

            </div>

        )
    }
}
