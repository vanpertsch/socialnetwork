import React from "react";
import { Link } from 'react-router-dom';


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // this.handleChange =
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    submit() {
        fetch('/login.json', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        }).then(
            res => res.json()
        ).then(
            data => {
                console.log("/login.json data", data);
                if (data.success) {
                    //a user should not go back to register again. the url is no longer in location history
                    location.replace('/');
                } else {
                    //this.state runs asynchronous. to see the change we have to pass a cb function
                    this.setState({
                        error: true
                    }, () => console.log(this.state));
                }
            }
        )
    }
    render() {
        return (
            <div>
                {this.state.error && <div className='error'>Please enter valid username and password</div>}
                <input onChange={(e) => this.handleChange(e)} name="email" />
                <input onChange={(e) => this.handleChange(e)} name="password" />
                <button onClick={() => this.submit()}>submit</button>

                <Link to="/">Click here to Register!</Link>
                <Link to="/password/reset">Reset Password!</Link>
            </div>
        );
    }

}
