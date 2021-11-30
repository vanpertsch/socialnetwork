
export default function Profilepic({ first, last, imageUrl, toggleUploader, imgSize }) {
    imageUrl = imageUrl || '/panda.svg';

    return <img className={imgSize} onClick={toggleUploader} src={imageUrl} alt={`${first} ${last}`
    } />;
}
