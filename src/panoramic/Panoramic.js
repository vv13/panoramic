import React, {Component} from 'react'
import './style.css'
import ImgBar from './components/ImgBar'


import PhotoSphereViewer from '../lib/PhotoSphereViewer'

class Panoramic extends Component {
    constructor(props, context) {
        super(props, context);
        this.selectPic = ''
        this.PSV = ''
    }
    componentWillMount() {}
    componentDidMount() {
    }
    changePic(v) {
        this.selectPic = v
        this.showPic()
    }
    showPic(url) {
        console.log(url)
        if (!url) return

        const loader = document.createElement('div');
        loader.className = 'loader';

        // Panorama display
        const div = document.getElementById('container');
        div.style.height = '30px';

        // eslint-disable-next-line
        this.PSV = new PhotoSphereViewer({
            // Path to the panorama
            panorama: url,

            // Container
            container: div,

            // Deactivate the animation
            time_anim: false,

            // Display the navigation bar
            navbar: true,

            // Resize the panorama
            size: {
                width: '100%',
            },

            // HTML loader
            loading_html: loader,

            // Disable smooth moves to test faster
            smooth_user_moves: false
        });
    }

    render() {

        return (
            <div className="panoramic">
                <ImgBar choose={(e) => this.showPic(e)}></ImgBar>
                <div id="container" className="panoramic__app"></div>
            </div>
        );
    }
}

export default Panoramic;
