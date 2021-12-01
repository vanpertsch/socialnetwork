import { Link } from 'react-router-dom';

import useAuthSubmit from '../../hooks/useAuthSubmit.js';
import useForm from '../../hooks/useForm.js';

export default function Login() {
    const [values, handleChange] = useForm();
    const [submit, error] = useAuthSubmit('/login.json', values);

    return (
        <div>
            {error && <div className="error">Something went wrong!</div>}
            <input name="email" type="email" onChange={handleChange} />
            <input name="password" type="password" onChange={handleChange} />
            <button onClick={submit}>submit</button>

            <Link to="/">Click here to register!</Link>
            <Link to="/password/reset">Reset Password!</Link>
        </div>
    );
}
