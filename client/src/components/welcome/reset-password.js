import { Component } from 'react';
import { Link } from 'react-router-dom';
export default class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stage: 1
        };
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    submitStage1() {
        fetch('/password/reset/start', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
            })
        }).then(
            res => res.json()
        ).then(
            data => {
                console.log(data);
                if (data.success) {
                    //a user should not go back to register again. the url is no longer in location history
                    // location.replace('/');
                    this.setState({
                        stage: 2
                    }, () => console.log("submitStage1", this.state));
                } else {
                    //this.state runs asynchronous. to see the change we have to pass a cb function
                    this.setState({
                        error: true
                    }, () => console.log("submitStage1", this.state));
                }
            }
        );
    }
    submitStage2() {
        fetch('/password/reset/confirm', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                code: this.state.code,
                password: this.state.password,
            })
        }).then(
            res => res.json()
        ).then(
            data => {
                console.log(data);
                if (data.success) {
                    //a user should not go back to register again. the url is no longer in location history
                    // location.replace('/');
                    this.setState({
                        stage: 3
                    });
                } else {
                    //this.state runs asynchronous. to see the change we have to pass a cb function
                    this.setState({
                        error: true
                    }, () => console.log(this.state));
                }
            }
        );
    }
    render() {
        return (
            <div>
                <h1>Reset Password</h1>
                {this.state.error && <div className='error'>Something went wrong. Please try again</div>}

                {this.state.stage == 1 &&
                    <div>

                        <p>Please enter the email address with wich you registered. We will send you an email with further information</p>
                        <input onChange={(e) => this.handleChange(e)} name="email" />
                        <button onClick={() => this.submitStage1()}>submit</button>
                    </div>
                }
                {this.state.stage == 2 &&
                    <div>
                        <p>Please enter the code you recieved per mail</p>
                        <input onChange={(e) => this.handleChange(e)} name="code" />
                        <p>Please enter a new password</p>
                        <input onChange={(e) => this.handleChange(e)} name="password" />
                        <button onClick={() => this.submitStage2()}>submit</button>
                    </div>
                }
                {this.state.stage == 3 &&
                    <div>
                        <p>PSuccess!</p>
                        <Link to="/login">Click here to Log in!</Link>
                    </div>
                }

            </div>

        )
    }
}
