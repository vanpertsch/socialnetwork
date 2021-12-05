import { useDispatch, useSelector } from "react-redux";

export default function WannabeButton(props) {

    const dispatch = useDispatch();


    return (
        <div>
            <button>{props.buttonText} user.id{props.friend_id}</button>
        </div>
    )
}
