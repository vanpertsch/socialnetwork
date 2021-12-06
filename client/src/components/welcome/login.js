import { Link } from 'react-router-dom';
import { Form, Button, Alert, Row, Col, Stack } from 'react-bootstrap';
import useAuthSubmit from '../../hooks/useAuthSubmit.js';
import useForm from '../../hooks/useForm.js';

export default function Login() {
    const [values, handleChange] = useForm();
    const [submit, error] = useAuthSubmit('/login.json', values);

    return (
        <div className='section'>
            {error && <Alert key="warning-login" variant="warning">
                Something went wrong!
            </Alert>}
            <Row>

                <Col md={6}>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="I consent to your privacy policy" />
                    </Form.Group>
                    <Stack direction="horizontal" gap={3}>

                        <Button variant="primary" type="submit" onClick={submit}>
                            Submit
                        </Button>

                        {/* </Col> */}
                        {/* <Col md={6}> */}
                        <Link to="/"><Button variant="primary">Click here to register</Button></Link>
                        {/* </Col>
                <Col md={6}> */}
                        <Link to="/password/reset"><Button variant="primary">Reset Password</Button></Link>
                    </Stack>
                </Col>
            </Row>
        </div>
    );
}
