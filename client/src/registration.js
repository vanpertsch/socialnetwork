import React from "react";


export default class Registration extends React.Component {
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
        fetch('/registration.json', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                password: this.state.password,
            })
        }).then(
            res => res.json()
        ).then(
            data => {
                console.log(data);
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
                {this.state.error && <div className='error'>OOOPS</div>}
                <input onChange={(e) => this.handleChange(e)} name="first" />
                <input onChange={(e) => this.handleChange(e)} name="last" />
                <input onChange={(e) => this.handleChange(e)} name="email" />
                <input onChange={(e) => this.handleChange(e)} name="password" />
                <button onClick={() => this.submit()}>submit</button>
            </div>
        );
    }

}
