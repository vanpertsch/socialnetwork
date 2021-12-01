import React from "react";
import { Link } from 'react-router-dom';
import useAuthSubmit from '../../hooks/useAuthSubmit.js';
import useForm from '../../hooks/useForm.js';

export default function Registration() {
    const [values, handleChange] = useForm();
    const [submit, error] = useAuthSubmit('/registration.json', values);

    return (
        <div>
            {error && <div className="error">Something went wrong!</div>}
            < input onChange={handleChange} name="first" />
            <input onChange={handleChange} name="last" />
            <input onChange={handleChange} name="email" />
            <input onChange={handleChange} name="password" />
            <button onClick={submit}>submit</button>

            <Link to="/login">Click here to Log in!</Link>
            <Link to="/password/reset">Reset Password!</Link>

        </div >
    );


}

