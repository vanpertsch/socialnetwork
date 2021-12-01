import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function FindPeople({ user_id }) {

    const [users, setUsers] = useState();
    const [term, setTerm] = useState("");



    useEffect(() => {

        fetch(`/newusers/id.json`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUsers(data);
            }).catch((err) => {
                console.log("err in newuser", err);
            });

    }, []);

    useEffect(() => {
        console.log(term);

        fetch(`/users/${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUsers(data);
            }).catch((err) => {
                console.log("err in fetch(`/users/${term}`)", err);
            });

    }, [term]);




    return (

        <div>

            <div>
                {users && users.map(user => (


                    <div key={user.id} >
                        <Link to={`/otherprofile/${user.id}`}>
                            <img className="profilepic-lg" src={user.img_url || '/panda.svg'} alt={`${user.first} ${user.last}`
                            } />
                            <p >{user.first} {user.last}</p>

                        </Link>
                    </div>
                ))}
            </div>

            <div>
                <input onChange={(e) => setTerm(e.target.value)} name="search" />
            </div>

        </div>
    );

}
