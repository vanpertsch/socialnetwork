import { useSelector } from "react-redux";

import { Row, Col } from 'react-bootstrap';
import Profilepic from "./profilepic";
import BioEditor from './bioeditor';

export default function Profile({ toggleUploader, updateProfileBio }) {

    const user = useSelector(state => state?.user);
    return (

        <div>
            <Row>
                <Col md={4}>

                    <Profilepic imgSize="profilepic-lg" toggleUploader={toggleUploader} />
                </Col>
                <Col md={6}>
                    <h3>{user.first} {user.last}</h3>

                    <BioEditor updateProfileBio={updateProfileBio} />

                </Col>
            </Row>


        </div>
    )
}
