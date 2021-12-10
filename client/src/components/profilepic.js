import { useSelector } from "react-redux";



export default function Profilepic({ toggleUploader, imgSize }) {
    const user = useSelector(state => state?.user);

    const imageUrl = user.img_url || '/panda.svg';

    return <img className={imgSize} onClick={toggleUploader} src={imageUrl} alt={`${user.first} ${user.last}`
    } />;
}
