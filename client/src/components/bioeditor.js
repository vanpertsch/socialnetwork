import { Component } from 'react';

import { Row, Col, Card, Form, FormControl, Button } from 'react-bootstrap';
export default class BioEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editorIsVisible: false,
            draftBio: ''
        };

    }

    toggleArea() {
        console.log("this.props.bio", this.props.bio);
        this.setState({
            editorIsVisible: !this.state.editorIsVisible
        });
    }


    setDraftBio(e) {
        console.log(e.target.value);
        this.setState({ draftBio: e.target.value });
    }

    async upload() {

        try {
            const res = await fetch('/upload/bio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ bio: this.state.draftBio, email: this.props.email })
            });
            const data = await (res.json());
            console.log("updateProfileBio(data.bio)", data.bio);
            this.setState({
                draftBio: data.bio
            });
            this.props.updateProfileBio(data.bio);
            this.toggleArea();

        } catch (err) {
            console.log("err in bio upload", err);
            this.setState({
                error: true
            });
        };

    }

    render() {

        return (
            <>
                {/* <div className="dist"></div> */}
                <Row>
                    <Col md={12}>
                        {!this.state.editorIsVisible &&
                            < div className="container__bio">
                                <p>{this.props.bio}</p>
                            </div>
                        }
                        {this.state.editorIsVisible &&
                            <div className="bioeditor">

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" rows={5} cols={33} onChange={(e) => this.setDraftBio(e)} defaultValue={this.props.bio} />
                                </Form.Group>


                            </div>
                        }

                    </Col>
                    <div className="dist"></div>
                    <Col md={12}>

                        {!this.state.editorIsVisible && this.props.bio && <Button variant="primary" onClick={() => this.toggleArea()}>Edit bio</Button>}

                        {!this.state.editorIsVisible && !this.props.bio && <Button variant="primary" onClick={() => this.toggleArea()}>Add your bio</Button>}

                        {this.state.editorIsVisible && <Button variant="primary" onClick={() => this.upload()}>Save</Button>}
                    </Col>
                </Row>



            </>
        );
    }
}
