import { Component } from 'react';
import { Modal, Button, Row, Col, Form, Alert, Spinner } from 'react-bootstrap';

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            img_url: '',
            errorFileSize: false,
            errorEmptyFile: false,
            waitForImage: false
        };
    }

    setFile(e) {
        console.log(e.target.files[0]);
        if (e.target.files[0].size > 2097152) {
            this.setState({ errorFileSize: true });
            this.setState({ errorEmptyFile: false });
        } else {
            this.setState({ errorEmptyFile: false });
            this.setState({ errorFileSize: false });
            this.setState({ file: e.target.files[0] });
        }

    }

    upload() {
        if (!this.state.file) {
            console.log("LOG", this.state.file);
            this.setState({ errorEmptyFile: true });
        } else {
            this.setState({ errorEmptyFile: false });
        }
        this.setState({ img_url: '' });
        this.setState({ waitForImage: true });

        const formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('email', this.props.email);


        fetch('/upload', {
            method: 'POST',
            body: formData
        })
            .then((data) => data.json())
            .then((data) => {

                console.log("images from server:", data);
                this.props.updateProfileImg(data.img_url);
                this.setState({ waitForImage: false });
                this.setState({ img_url: data.img_url });



            });

    }
    close() {
        this.props.toggleUploader();

    }


    render() {
        return (
            <>
                <Modal
                    show={this.props.show}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Change your Profile Picture
                        </Modal.Title>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => this.close()}></button>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col md={8}>
                                <div className='modal__body'>

                                    <Form.Group controlId="formFile" className="mb-3">
                                        {/* <Form.Label>Select Image</Form.Label> */}
                                        <Form.Control name="file" type="file" accept="image/*" onChange={(e) => this.setFile(e)} />
                                    </Form.Group>
                                    {/* <Input id="file" name="file" type="file" accept="image/*" onChange={(e) => this.setFile(e)} /> */}
                                    {/* <label htmlFor="file"><span>Select Image</span></label> */}
                                    {!this.state.errorFileSize && <Button onClick={() => this.upload()}>Upload Image</Button>}
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='modal__body-image'>

                                    {this.state.waitForImage && !this.state.errorEmptyFile && !this.state.errorFileSize && <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>}

                                    {this.state.img_url && <img src={this.state.img_url} className="profilepic-modal" alt="profilepic" />}

                                    {this.state.errorFileSize && <Alert key="warning" variant="warning">
                                        File is too large
                                    </Alert>}

                                    {this.state.errorEmptyFile && <Alert key="secondwarning" variant="warning">
                                        Please select a file
                                    </Alert>}
                                </div>
                            </Col>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.close()}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}



