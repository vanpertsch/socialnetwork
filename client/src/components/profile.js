
import Profilepic from "./profilepic";
import BioEditor from './bioeditor';

export default function Profile({ first, last, imageUrl, email, bio, toggleUploader, updateProfileBio }) {
    console.log("bio", bio)
    return (
        <div>
            <h1>Profile Page</h1>
            <Profilepic imageUrl={imageUrl} imgSize="profilepic-lg" toggleUploader={toggleUploader} />
            <h3>{first}{last}</h3>

            <BioEditor email={email} updateProfileBio={updateProfileBio} bio={bio} />

        </div>
    )
}
