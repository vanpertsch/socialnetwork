import { Component } from 'react';
import Profilepic from './profilepic';
import Uploader from './uploalder';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.updateProfileImg = this.updateProfileImg.bind(this);
    }
    componentDidMount() {
        console.log("app component did mount", this.props.user);

        //fetch data from currently loggedIn user

        fetch(`/user/profile/${this.props.user}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    email: data.email,
                    first: data.first,
                    last: data.last,
                    img_url: data.img_url
                });
            }).catch((err) => {
                console.log("err in did mount", err);
            });

    }

    updateProfileImg(val) {
        this.setState({
            img_url: val
        });
    }

    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }



    render() {
        return (
            <>
                <header>
                    <img
                        className=''
                        src="/logo.png"
                        alt="commonground logo"
                    />
                    <Profilepic
                        first={this.state.first}
                        last={this.state.last}
                        imageUrl={this.state.img_url}
                        toggleUploader={this.toggleUploader}
                    />
                </header>
                {/* <button onClick={this.toggleUploader}>Toggle uploader</button> */}
                {this.state.uploaderIsVisible && <Uploader user_profile={this.state.email} updateProfileImg={this.updateProfileImg} toggleUploader={this.toggleUploader} />}
            </>
        )
    }
}

