import { Component } from 'react';


export default class BioEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editorIsVisible: false,
            draftBio: ''
        };

    }

    toggleArea() {
        console.log("this.props.bio", this.props.bio);
        this.setState({
            editorIsVisible: !this.state.editorIsVisible
        });
    }


    setDraftBio(e) {
        console.log(e.target.value);
        this.setState({ draftBio: e.target.value });
    }

    async upload() {

        try {
            const res = await fetch('/upload/bio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ bio: this.state.draftBio, email: this.props.email })
            });
            const data = await (res.json());
            console.log("updateProfileBio(data.bio)", data.bio);
            this.setState({
                draftBio: data.bio
            });
            this.props.updateProfileBio(data.bio);
            this.toggleArea();

        } catch (err) {
            console.log("err in bio upload", err);
            this.setState({
                error: true
            });
        };

    }

    render() {

        return (
            <>
                <div>
                    {!this.state.editorIsVisible && <p>{this.props.bio}</p>}
                </div>

                <div className="bioeditor">
                    {this.state.editorIsVisible && <textarea rows="5" cols="33" onChange={(e) => this.setDraftBio(e)} defaultValue={this.props.bio}></textarea>}
                    {!this.state.editorIsVisible && this.props.bio && <button onClick={() => this.toggleArea()}>Edit bio</button>}
                    {!this.state.editorIsVisible && !this.props.bio && <button onClick={() => this.toggleArea()}>Add your bio</button>}

                    {this.state.editorIsVisible && <button onClick={() => this.upload()}>Save</button>}
                </div>
            </>
        );
    }
}
