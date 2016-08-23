'use strict';

import React from "react";
import FontAwesome from "react-fontawesome";
import notifier from "node-notifier";

export class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isProgress: false,
      isStart: true,
      isBreak: false,
      counter: Array(this.props.startCount).fill(2),
      time: this.props.duration
    };
    this.handleStartClicked = ::this.handleStartClicked;
    this.handleSkipClicked = ::this.handleSkipClicked;
    this.tick = ::this.tick;
  }

  handleStartClicked() {
    if (!this.state.isProgress) {
      this.interval = setInterval(this.tick, 1000);
      this.setState({
        isProgress: true,
        isStart: false
      });
      if (this.state.counter == 0 || this.state.counter[this.state.counter.length - 1] == 2) {
        this.setState({counter: this.state.counter.concat([0])});
      }
    } else {
      clearInterval(this.interval);
      this.setState({isProgress: false});
    }
  }

  handleSkipClicked() {
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
      this.notify('休憩時間終了です！');
      this.playSoundfile('end.mp3');
    } else {
      this.break();
      this.notify('お疲れ様です！休憩時間です');
      this.playSoundfile('alert.mp3');
    }
  }

  break() {
    this.setState({
      isProgress: true,
      isBreak: true,
      counter: (this.state.counter.slice(0, this.state.counter.length - 1)).concat([1]),
      time: this.props.breakTime
    });
  }

  reset() {
    clearInterval(this.interval);
    this.setState({
      isProgress: false,
      isBreak: false,
      isStart: true,
      counter: (this.state.counter.slice(0, this.state.counter.length - 1)).concat([2]),
      time: this.props.duration
    });
  }

  notify(message) {
    notifier.notify({
      title: 'Pomidory Timer',
      message: message,
      wait: true
    });
  }

  playSoundfile(filename) {
    const sound = new Howl({
      urls: ['../audios/' + filename],
      autoplay: true,
      onend: function () { }
    });
  }

  converter = {
    s2m(s) {
      let minutes = Math.floor(s / 60);
      let seconds = s % 60;
      return ('0' + minutes.toString()).slice(-2) + ':' + ('0' + seconds.toString()).slice(-2);
    }
  };

  isSkipable() {
    return !this.state.isStart;
  }

  isForward() {
    return true;
    // return mainWindow.isAlwaysOnTop();
  }

  render() {
    return (
      <div className="wrapper">
        <div className="timer-col">
          <button
            type="button"
            className={"btn-timer "
            + (this.state.isBreak ? "time-break" : "time-play") + " "
            + (this.state.isProgress ? "time-start" : "time-pause")}
            onClick={this.handleStartClicked}>
            <h2>{this.converter.s2m(this.state.time)}</h2>
            <div className="icon-wrap">
              <FontAwesome className="timer-btn-icon"
                           name={this.state.isProgress ? "pause" : "play"}/>
            </div>
          </button>
        </div>
        <div className="description-col">
          <div className="checks">
            {this.state.counter.map(function (n) {
                if (n == 0) {
                  return <FontAwesome className="tomato-count-icon"
                                      name="play-circle-o"/>;
                } else if (n == 1) {
                  return <FontAwesome className="tomato-count-icon" name="coffee"
                                      spin/>;
                } else {
                  return <FontAwesome className="tomato-count-icon"
                                      name="check"/>;
                }
              }
            )}
          </div>
        </div>
        <div className="navigations-col">
          <div className="navigations">
            <FontAwesome
              className={"navigations-forward" + " " + (this.isForward() ? "active" : "")}
              name="map-pin"/>
            <FontAwesome
              className={"navigations-skip" + " " + (this.isSkipable() ? "active" : "")}
              onClick={this.handleSkipClicked}
              name="fast-forward"/>
            <FontAwesome
              className="navigations-dragable"
              name="arrows-alt"/>
          </div>
        </div>
      </div>
    );
  }
}

if (process.env.NODE_ENV == 'development') {
  Main.defaultProps = {
    startCount: 13,
    duration: 5,
    breakTime: 5
  };
} else {
  Main.defaultProps = {
    startCount: 0,
    duration: 60 * 25,
    breakTime: 60 * 5
  };
}
