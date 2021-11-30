import { useEffect, useState } from 'react';

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
                console.log("err in did mount", err);
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
                        <img className="profilepic-lg" src={user.img_url} alt={`${user.first} ${user.last}`
                        } />
                        <p >{user.first} {user.last}</p>

                    </div>

                ))}
            </div>

            <div>
                <input onChange={(e) => setTerm(e.target.value)} name="search" />
            </div>

        </div>
    );

}
