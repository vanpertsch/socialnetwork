import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { removeProfileImg, updateProfileImg } from "./../redux/user/slice.js";

import { Modal, Button, Row, Col, Form, Alert, Spinner } from 'react-bootstrap';

export default function Uploader(props) {
    const dispatch = useDispatch();

    const [file, setFile] = useState(null);
    const [errorFileSize, setErrorFileSize] = useState(false);
    const [errorEmptyFile, setErrorEmptyFile] = useState(false);
    const [waitForImage, setWaitForImage] = useState(false);

    const user = useSelector(state => state?.user);


    function changeFile(e) {
        console.log(e.target.files[0]);
        if (e.target.files[0].size > 2097152) {
            setErrorFileSize(true);
            setErrorEmptyFile(false);
        } else {
            setErrorEmptyFile(false);
            setErrorFileSize(false);
            setFile(e.target.files[0]);
        }

    }

    function upload() {
        if (!file) {
            // console.log("LOG", this.state.file);
            setErrorEmptyFile(true);
        } else {
            setErrorEmptyFile(false);
        }

        dispatch(removeProfileImg());
        setWaitForImage(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('email', user.email);


        fetch('/upload', {
            method: 'POST',
            body: formData
        })
            .then((data) => data.json())
            .then((data) => {

                console.log("images from server:", data);
                dispatch(updateProfileImg(data.img_url));
                setWaitForImage(false);
            });

    }

    function close() {
        props.toggleUploader();

    }

    return (
        <>
            <Modal
                show={props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Change your Profile Picture
                    </Modal.Title>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => close()}></button>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col md={8}>
                            <div className='modal__body'>

                                <Form.Group controlId="formFile" className="mb-3">

                                    <Form.Control name="file" type="file" accept="image/*" onChange={(e) => changeFile(e)} />
                                </Form.Group>

                                {!errorFileSize && <Button onClick={() => upload()}>Upload Image</Button>}
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className='modal__body-image'>

                                {waitForImage && !errorEmptyFile && !errorFileSize && <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>}

                                {user.img_url && <img src={user.img_url} className="profilepic-modal" alt="profilepic" />}

                                {errorFileSize && <Alert key="warning" variant="warning">
                                    File is too large
                                </Alert>}

                                {errorEmptyFile && <Alert key="secondwarning" variant="warning">
                                    Please select a file
                                </Alert>}
                            </div>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => close()}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}




