import { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Profilepic from './components/profilepic';
import Uploader from './components/uploalder';
import Profile from './components/profile';
import FindPeople from './components/findPeople';
import OtherProfile from './components/otherProfile';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
        };
        // this.toggleUploader = this.toggleUploader.bind(this);
        this.updateProfileImg = this.updateProfileImg.bind(this);
        this.updateProfileBio = this.updateProfileBio.bind(this);

    }
    async componentDidMount() {
        console.log("app component did mount", this.props.user_id);

        //fetch data from currently loggedIn user

        try {
            const res = await fetch(`/user/profile/${this.props.user_id}`);
            const data = await (res.json());

            return this.setState({
                email: data.email,
                first: data.first,
                last: data.last,
                img_url: data.img_url,
                bio: data.bio
            });

        } catch (err) {
            console.log("err in did mount", err);
            this.setState({
                error: true
            });
        };

        // fetch(`/ user / profile / ${ this.props.user_id } `)
        //     .then(res => res.json())
        //     .then(data => {
        //         this.setState({
        //             email: data.email,
        //             first: data.first,
        //             last: data.last,
        //             img_url: data.img_url
        //         });
        //     }).catch((err) => {
        //         console.log("err in did mount", err);
        //     });

    }

    updateProfileImg(val) {
        this.setState({
            img_url: val
        });
    }
    updateProfileBio(val) {
        this.setState({
            bio: val
        });
    }

    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }

    render() {
        console.log("bio App", this.state.bio);
        return (
            <>
                <BrowserRouter>
                    <header>
                        <img
                            className='logo'
                            src="/logo.png"
                            alt="commonground logo"
                        />

                        <div>
                            <Link to="/users">Find People</Link>
                        </div>
                        <div>
                            <Link to="/">My Profile</Link>
                        </div>

                        <Profilepic
                            first={this.state.first}
                            last={this.state.last}
                            imageUrl={this.state.img_url}
                            toggleUploader={() => this.toggleUploader()}
                            imgSize="profilepic-nav"
                        />
                    </header>

                    <Route exact path="/users">
                        <FindPeople user_id={this.props.user_id} />
                    </Route>
                    <Route exact path="/otherprofile/:id">
                        <OtherProfile />
                    </Route>
                    <Route exact path="/">
                        <Profile
                            first={this.state.first}
                            last={this.state.last}
                            imageUrl={this.state.img_url}
                            bio={this.state.bio}
                            email={this.state.email}
                            toggleUploader={() => this.toggleUploader()}
                            updateProfileBio={this.updateProfileBio}
                        />
                    </Route>

                    {this.state.uploaderIsVisible && <Uploader email={this.state.email} updateProfileImg={this.updateProfileImg} toggleUploader={() => this.toggleUploader()} />}
                </BrowserRouter>
            </>
        );
    }
}

