
export default function Profilepic({ first, last, imageUrl, toggleUploader }) {
    imageUrl = imageUrl || 'default.png';

    return <img className="profileimg" onClick={toggleUploader} src={imageUrl} || "/logo.png" alt = {`${first} ${last}`
} />;
}
