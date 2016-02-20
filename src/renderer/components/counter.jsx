'use strict';

import React from 'react';

export class Count extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countList: []
        };
    }

    counteUp() {
        this.setState({ isProgress: false })
    }

    render() {
        return (
            <span className={"tomato-count-icon glyphicon glyphicon-" + this.state.isProgress ? "play-circle" : "ok"}></span>
        );
    }
}
