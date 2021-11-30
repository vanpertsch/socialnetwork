import { Component } from 'react';

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: ''

        };
    }

    setFile(e) {
        console.log(e.target.files[0]);
        this.setState({ file: e.target.files[0] });

    }

    upload() {
        const formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('email', this.props.email);


        fetch('/upload', {
            method: 'POST',
            body: formData
        })
            .then((data) => data.json())
            .then((data) => {
                console.log("images from server:", data);
                this.props.updateProfileImg(data.img_url);
                this.props.toggleUploader();
            });

    }


    render() {
        return (
            <>
                <div className="uploader">

                    <input id="file" name="file" type="file" accept="image/*" onChange={(e) => this.setFile(e)} />
                    <label htmlFor="file"><span>Select Image</span></label>
                    <button onClick={() => this.upload()}>Upload Image</button>
                </div>
            </>
        )
    }
}
