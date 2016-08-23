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
    this.setState({isProgress: false})
  }

  render() {
    const fa_style = this.state.isProgress ? "play-circle" : "ok"
    const style = "tomato-count-icon glyphicon glyphicon-" + fa_style
    return (
      <span
        className={style}></span>
    );
  }
}
