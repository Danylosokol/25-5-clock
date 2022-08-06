
import React from "react";
import "./index.css";
import Session from "./Session";
import Break from "./Break";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionSetted: 25,
      session: {
        min: 25,
        sec: 0,
      },
      breakSetted: 5,
      break: {
        min: 5,
        sec: 0,
      },
      countdown: null,
      part: "Session",
    };

    this.handleRestart = this.handleRestart.bind(this);
    this.handleStartStop = this.handleStartStop.bind(this);
    this.handleIncrDecr = this.handleIncrDecr.bind(this);
    this.handleCountDown = this.handleCountDown.bind(this);

    this.audioBeep = React.createRef();
  }

  handleStartStop() {
    console.log("start-stop");
    if (this.state.countdown !== null) {
      clearInterval(this.state.countdown);
      this.setState({
        countdown: null,
      });
    } else {
      if (this.state.part === "Session") {
        this.handleCountDown(this.state.session.min, this.state.session.sec);
      } else {
        this.handleCountDown(this.state.break.min, this.state.break.sec);
      }
    }
  }

  handleCountDown(min, sec) {
    const finish = new Date(
      new Date().getTime() + min * 60000 + sec * 1000 + 1000
    ).getTime();
    let x = setInterval(() => {
      let distance = finish - new Date().getTime();
      if (this.state.part === "Session") {
        this.setState((state) => ({
          session: {
            min:
              state.session.sec === 0
                ? Math.floor((distance % 3600000) / 60000)
                : state.session.min,
            sec: Math.floor((distance % 60000) / 1000),
          },
        }));
      } else {
        this.setState((state) => ({
          break: {
            min:
              state.break.sec === 0
                ? Math.floor((distance % 3600000) / 60000)
                : state.break.min,
            sec: Math.floor((distance % 60000) / 1000),
          },
        }));
      }
      if (distance < 0) {
        clearInterval(this.state.countdown);
        if (this.state.part === "Session") {
          this.setState((state) => ({
            session: {
              min: state.sessionSetted,
              sec: 0,
            },
            part: "Break",
            countdown: null,
          }));
          this.handleCountDown(this.state.break.min, this.state.break.sec);
        } else {
          this.setState((state) => ({
            break: {
              min: state.sessionSetted,
              sec: 0,
            },
            part: "Session",
            countdown: null,
          }));
          this.handleCountDown(this.state.session.min, this.state.session.sec);
        }
      }
    }, 1000);
    this.setState({
      countdown: x,
    });
  }

  handleRestart() {
    const beep = document.getElementById("beep");
    beep.pause();
    beep.currentTime = 0;
    console.log("restart");
    clearInterval(this.state.countdown);
    this.setState({
      sessionSetted: 25,
      session: {
        min: 25,
        sec: 0,
      },
      breakSetted: 5,
      break: {
        min: 5,
        sec: 0,
      },
      countdown: null,
      part: "Session",
    });
  }

  handleIncrDecr(event) {
    switch (event.currentTarget.id) {
      case "break-increment":
        // if(this.state.breakSetted < 60){
        console.log("Break+ :" + this.state.breakSetted);
        this.setState((state) => ({
          breakSetted:
            state.breakSetted < 60 ? state.breakSetted + 1 : state.breakSetted,
          break: {
            min:
              state.breakSetted < 60
                ? state.breakSetted + 1
                : state.breakSetted,
            sec: 0,
          },
        }));
        // }
        break;
      case "break-decrement":
        // if(this.state.breakSetted > 1){
        console.log("Break- :" + this.state.breakSetted);
        this.setState((state) => ({
          breakSetted:
            state.breakSetted > 1 ? state.breakSetted - 1 : state.breakSetted,
          break: {
            min:
              state.breakSetted > 1 ? state.breakSetted - 1 : state.breakSetted,
            sec: 0,
          },
        }));
        // }
        break;
      case "session-increment":
        console.log("Session+ :" + this.state.sessionSetted);
        this.setState((state) => ({
          sessionSetted:
            state.sessionSetted < 60
              ? state.sessionSetted + 1
              : state.sessionSetted,
          session: {
            min:
              state.sessionSetted < 60
                ? state.sessionSetted + 1
                : state.sessionSetted,
            sec: 0,
          },
        }));
        break;
      case "session-decrement":
        console.log("Session- :" + this.state.sessionSetted);
        this.setState((state) => ({
          sessionSetted:
            state.sessionSetted > 1
              ? state.sessionSetted - 1
              : state.sessionSetted,
          session: {
            min:
              state.sessionSetted > 1
                ? state.sessionSetted - 1
                : state.sessionSetted,
            sec: 0,
          },
        }));
        break;
    }
  }

  render() {
    let min = 0;
    let sec = 0;
    if (this.state.part === "Session") {
      min =
        this.state.session.min < 10
          ? "0" + this.state.session.min
          : this.state.session.min;
      sec =
        this.state.session.sec < 10
          ? "0" + this.state.session.sec
          : this.state.session.sec;
    } else {
      min =
        this.state.break.min < 10
          ? "0" + this.state.break.min
          : this.state.break.min;
      sec =
        this.state.break.sec < 10
          ? "0" + this.state.break.sec
          : this.state.break.sec;
    }
    if(min === "00" && sec === "00"){
      this.audioBeep.current.play();
    }
    return (
      <div id="timer">
      
        <div id="duration-controls">
          <Break
            handler={this.handleIncrDecr}
            value={this.state.breakSetted}
          ></Break>
          <Session
            handler={this.handleIncrDecr}
            value={this.state.sessionSetted}
          ></Session>
        </div>

        <div id="timer-body">
          <div id="timer-label">{this.state.part}</div>

          <div id="time-left">
            {min}:{sec}
          </div>

          <div id="flow-controls">
            <div id="start_stop" onClick={this.handleStartStop}>
              <i className="fa fa-play" aria-hidden="true"></i>
              <i className="fa fa-stop" aria-hidden="true"></i>
            </div>
            <div id="reset" onClick={this.handleRestart}>
              <i className="fa fa-repeat" aria-hidden="true"></i>
            </div>
          </div>

          <audio ref={this.audioBeep} src="./beep.mp3" id="beep"></audio>
        </div>
      </div>
    );
  }
}

export default App;
