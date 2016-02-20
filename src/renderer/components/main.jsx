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
      counter: [2, 2],
      time: this.props.duration
    };
    this.handleStartClicked = ::this.handleStartClicked;
    this.handleResetClicked = ::this.handleResetClicked;
    this.tick = ::this.tick;
  }

  handleStartClicked() {
    if (!this.state.isStart) {
      this.interval = setInterval(this.tick, 1000);
      this.setState({ isStart: true });
      if (this.state.counter.indexOf(0) == -1) {
        this.setState({ counter: this.state.counter.concat([0]) });
      }
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
      counter: (this.state.counter.slice(0, this.state.counter.length - 1)).concat([1]),
      time: this.props.breakTime
    });
  }

  reset() {
    clearInterval(this.interval);
    this.setState({
      isStart: false,
      isBreak: false,
      counter: (this.state.counter.slice(0, this.state.counter.length - 1)).concat([2]),
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

  countGraphicon(n) {
    return ['play-circle', '', 'ok']
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
          {this.state.counter.map(function(e) {
                return <span className={"tomato-count-icon glyphicon glyphicon-" + (e == 0 ? "play-circle" : "ok")}></span>;
              }
          )}
        </div>
      </div>
    );
  }
}

Main.defaultProps = {
  duration: 5,
  breakTime: 5
};
