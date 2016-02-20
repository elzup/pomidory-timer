'use strict';

import React from 'react';
import shell from 'shell';
import notifier from 'node-notifier'

export class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isStart: false,
      isBreak: false,
      time: this.props.duration
    };
    this.handleStartClicked = ::this.handleStartClicked;
    this.handleResetClicked = ::this.handleResetClicked;
    this.tick = ::this.tick;
  }

  handleStartClicked() {
    if (!this.state.isStart) {
      this.interval = setInterval(this.tick, 1000);
      this.setState({isStart: true});
    } else {
      clearInterval(this.interval);
      this.setState({isStart: false});
    }
  }

  handleResetClicked() {
    this.reset();
  }

  tick() {
    this.setState({time: this.state.time - 1});
    if (this.state.time === 0) {
      this.finishEvent();
    }
  }

  finishEvent() {
    if (this.state.isBreak) {
      this.reset();
      this.notify('Break is over!');
    } else {
      this.break();
      this.notify('Good work!');
    }
  }

  break() {
    this.setState({
      isStart: true,
      isBreak: true,
      time: this.props.breakTime
    });
  }

  reset() {
    clearInterval(this.interval);
    this.setState({
      isStart: false,
      isBreak: false,
      time: this.props.duration
    });
  }

  notify(message) {
    notifier.notify({
      'title': 'Pomidory Timer',
      'message': message
    });
  }

  converter = {
    s2m(s) {
      let minutes = Math.floor(s / 60);
      let seconds = s % 60;
      return ('0' + minutes.toString()).slice(-2) + ':' + ('0' + seconds.toString()).slice(-2);
    }
  };

  render() {
    return (
      <div className="wrapper">
        <div className="timer-col">
          <button type="button" className={"btn-timer " + (this.state.isBreak ? "time-break" : "time-play")} onClick={this.handleStartClicked}>
            <h2>{this.converter.s2m(this.state.time)}</h2>
            <div>
              <span className={"timer-btn-icon glyphicon glyphicon-" + (this.state.isStart ? "pause" : "play")}></span>
            </div>
          </button>
        </div>
        <div className="description-col">
        </div>
      </div>
    );
  }
}

Main.defaultProps = {
  duration: 60,
  breakTime: 300
};
