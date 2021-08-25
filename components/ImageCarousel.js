import React from 'react';
import * as KeyCodes from '../services/KeyCodes';

class ImageCarousel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            current: 1,
            prevImageExists: true,
            ImageExists: true,
            nextImageExists: true,
            highlighted: null
        };
    }

    handleKeyDown = event => {
        const { keyCode } = event;

        if(keyCode === KeyCodes.ESCAPE) {
            this.highlight();
        }

        if(keyCode === KeyCodes.LEFT_ARROW) {
            this.movePicture(1);
        }

        if(keyCode === KeyCodes.RIGHT_ARROW) {
            this.movePicture(-1);
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    movePicture(val) {
        this.setState({ current: this.state.current + val });
    }

    loadStatus(image, status) {
        switch(image) {
            case "prev":
                this.setState({ prevImageExists: status == "ok" });
                return;
            case "curr":
                this.setState({ imageExists: status == "ok" });
                return;
            case "next":
                this.setState({ nextImageExists: status == "ok" });
                return;
        }
    }

    highlight(imageURL) {
        this.setState({ highlighted: imageURL });
    }

    render() {
        const { season, year, week } = this.props;
        const { current, imageExists, prevImageExists, nextImageExists, highlighted } = this.state;
        const baseURL = `/images/dallara-ir18/${year}/${season}/${week}/`;
        const imgURL = `${baseURL}0${current}.png`;
        const imgURLNext = `${baseURL}0${current + 1}.png`;
        const imgURLPrev = `${baseURL}0${current - 1}.png`;

        return (
            (imageExists || nextImageExists || prevImageExists) && 
                <React.Fragment>
                    <div className="carousel">
                        {prevImageExists && <button className="carousel-previous" onClick={() => this.movePicture(-1)}>&nbsp;</button>}
                        <img loading="lazy" className="carousel-hidden" src={imgURLPrev} 
                             onError={() => this.loadStatus("prev", "error")}
                             onLoad={() => this.loadStatus("prev", "ok")}></img>
                        <img loading="lazy" className="carousel-image" src={imgURL}
                             onClick={() => this.highlight(imgURL)}
                             onError={() => this.loadStatus("curr", "error")}
                             onLoad={() => this.loadStatus("curr", "ok")}></img>
                        <img loading="lazy" className="carousel-hidden" src={imgURLNext}
                             onError={() => this.loadStatus("next", "error")}
                             onLoad={() => this.loadStatus("next", "ok")}></img>
                        {nextImageExists && <button className="carousel-next" onClick={() => this.movePicture(1)}>&nbsp;</button>}
                    </div>
                    {highlighted ?
                        <React.Fragment>
                            <div className="carousel-highlight-container">
                                <div className="carousel-overlay"></div>
                                <div className="carousel-highlighted-image">
                                    <img src={highlighted}></img>
                                </div>
                                <button className="carousel-close-button" onClick={() => this.highlight()}></button>
                            </div>
                        </React.Fragment>
                    : ''}
                </React.Fragment>
        );
    }
}

export default ImageCarousel;