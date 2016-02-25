'use strict';

import React from 'react';
import FontAwesome from 'react-fontawesome';
import shell from 'shell';
import notifier from 'node-notifier'
import howler from 'howler'

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
      if (this.state.counter == 0 || this.state.counter[this.state.counter.length - 1] == 2) {
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
      this.notify('休憩時間終了です！');
    } else {
      this.break();
      this.notify('お疲れ様です！休憩時間です');
      this.playSound();
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
      title: 'Pomidory Timer',
      message: message,
      wait: true
    });
  }

  playSound() {
    var sound = new Howl({
      urls: ['../audios/megumin_stop.wav'],
      autoplay: true,
      volume: 0.5,
      onend: function() {
        console.log('Finished!');
      }
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
    return
  };

  render() {
    return (
      <div className="wrapper">
        <div className="timer-col">
          <button type="button" className={"btn-timer " + (this.state.isBreak ? "time-break" : "time-play")} onClick={this.handleStartClicked}>
            <h2>{this.converter.s2m(this.state.time)}</h2>
            <div className="icon-wrap">
              <FontAwesome className="timer-btn-icon" name={this.state.isStart ? "pause" : "play"} />
            </div>
          </button>
        </div>
        <div className="description-col">
          {this.state.counter.map(function(n) {
                return <FontAwesome className="tomato-count-icon" name={['play-circle-o', 'coffee', 'check'][n]} />;
              }
          )}
        </div>
      </div>
    );
  }
}

if (process.env.NODE_ENV == 'development') {
  Main.defaultProps = {
    duration: 10,
    breakTime: 10
  };
} else {
  Main.defaultProps = {
    duration: 60 * 25,
    breakTime: 60 * 5
  };
}
