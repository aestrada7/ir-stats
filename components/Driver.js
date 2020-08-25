import React from "react";
import { decode } from "../services/Common";

import Helmet from "./Helmet";

class Driver extends React.Component {
    render() {
        const { name, showHelmet, helmetColors } = this.props;

        return (
            <React.Fragment>
                <span className="helmet">{showHelmet ? <Helmet helmetColors={helmetColors}></Helmet> : ""}</span>
                <span className="driver-name">{decode(name)}</span>
            </React.Fragment>
        );
    }
}

export default Driver;