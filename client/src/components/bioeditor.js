import { useState } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { updateProfileBio } from "./../redux/user/slice.js";


import { Row, Col, Card, Form, FormControl, Button } from 'react-bootstrap';


export default function BioEditor(props) {

    const user = useSelector(state => state?.user);

    const dispatch = useDispatch();

    const [editorIsVisible, setEditorIsVisible] = useState(false);
    const [draftBio, setDraftBio] = useState("");
    const [error, setError] = useState(false);




    function toggleArea() {
        setEditorIsVisible(!editorIsVisible);
    }


    // function changeDraftBio(e) {
    //     setDraftBio(e.target.value);
    // }

    const changeDraftBio = (e) => {
        return setDraftBio(e.target.value);
    };

    async function upload() {

        try {
            const res = await fetch('/upload/bio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ bio: draftBio, email: user.email })
            });
            const data = await (res.json());
            console.log("updateProfileBio(data.bio)", data.bio);

            setDraftBio(data.bio);

            dispatch(updateProfileBio(data.bio));
            toggleArea();

        } catch (err) {
            console.log("err in bio upload", err);
            setError(true);

        }

    }

    return (
        <>
            <Row>
                <Col md={12}>
                    {!editorIsVisible &&
                        < div className="container__bio">
                            <p>{user.bio}</p>
                        </div>
                    }
                    {editorIsVisible &&
                        <div className="bioeditor">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" rows={5} cols={33} onChange={(e) => changeDraftBio(e)} defaultValue={user.bio} />
                            </Form.Group>
                        </div>
                    }

                </Col>
                <div className="dist"></div>
                <Col md={12}>

                    {!editorIsVisible && user.bio && <Button variant="primary" onClick={() => toggleArea()}>Edit bio</Button>}

                    {!editorIsVisible && !user.bio && <Button variant="primary" onClick={() => toggleArea()}>Add your bio</Button>}

                    {editorIsVisible && <Button variant="primary" onClick={() => upload()}>Save</Button>}
                </Col>
            </Row>

        </>
    );

}
