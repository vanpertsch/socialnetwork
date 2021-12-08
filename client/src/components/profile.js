import { Row, Col } from 'react-bootstrap';
import Profilepic from "./profilepic";
import BioEditor from './bioeditor';

export default function Profile({ first, last, imageUrl, email, bio, toggleUploader, updateProfileBio }) {

    return (
        <div>
            <Row>
                <Col md={4}>



                    <Profilepic imageUrl={imageUrl} imgSize="profilepic-lg" toggleUploader={toggleUploader} first={first}
                        last={last} />
                </Col>
                <Col md={6}>
                    <h3>{first}{last}</h3>

                    <BioEditor email={email} updateProfileBio={updateProfileBio} bio={bio} />

                </Col>
            </Row>


        </div>
    )
}
