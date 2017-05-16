import React, {Component, PropTypes} from 'react'
import './style.css'


class Panoramic extends Component {
    componentWillMount() {}
    componentDidMount() {
    }
    static defaultProps = {
          choose: PropTypes.func,

    }

    render() {
        const options = [
            { text: '工厂', value: '/photo/factory.jpg', avatar: '/photo/factory-small.jpg' },
            { text: '地球', value: '/photo/earth.jpg', avatar: '/photo/earth-small.jpg' },
            { text: '太阳', value: '/photo/sunshine.jpg', avatar: '/photo/sunshine-small.jpg' },
            { text: '沙漠', value: '/photo/desert.jpg', avatar: '/photo/desert-small.jpg' },
        ];
        return (
            <div className="pano__img-bar">
                {options.map(e => (
                    <img onClick={() => this.props.choose(e.value)} src={e.avatar} alt={e.text} key={e.text} className="img-bar__img" />
                ))}
            </div>
        );
    }
}

export default Panoramic;
