import React from "react";
import "./index.css";
import Session from './Session';
import Break from './Break';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      session: 25,
      sessionLeft: {
        min: 25,
        sec: 0
      },
      countdown: null
    }

    this.handleRestart = this.handleRestart.bind(this);
    this.handleStartStop = this.handleStartStop.bind(this);
  }

  handleStartStop(){
    console.log(this.state.countdown);
    if(this.state.countdown !== null){
      clearInterval(this.state.countdown);
      this.setState({
        countdown: null,
      });
    }else{
      const finish = new Date(
        new Date().getTime() + this.state.sessionLeft.min * 60000 + this.state.sessionLeft.sec * 1000 + 1000
      ).getTime();
      let x = setInterval(() => {
        const distance = finish - new Date().getTime();
        this.setState((state) => ({
          sessionLeft: {
            min:
              state.sessionLeft.sec === 0
                ? Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
                : state.sessionLeft.min,
            sec: Math.floor((distance % (1000 * 60)) / 1000),
          },
        }));
        if (distance < 0) {
          clearInterval(x);
        }
      }, 1000);
      this.setState({
        countdown: x,
      });
    }
  }

  handleRestart(){
    clearInterval(this.state.countdown);
    this.setState((state) => ({
      sessionLeft: {
        min: state.session,
        sec: 0
      }
    }));
  }

  render() {
    return (
      <div>
        <Break></Break>
        <Session></Session>
        <div id="timer-label">
          <div id="time-left">
            {this.state.sessionLeft.min < 10
              ? "0" + this.state.sessionLeft.min
              : this.state.sessionLeft.min}
            :
            {this.state.sessionLeft.sec < 10
              ? "0" + this.state.sessionLeft.sec
              : this.state.sessionLeft.sec}
          </div>
          <div id="start_stop" onClick={this.handleStartStop}>
            <i className="fa fa-play" aria-hidden="true"></i>
            <i className="fa fa-stop" aria-hidden="true"></i>
          </div>
          <div id="reset" onClick={this.handleRestart}>
            <i className="fa fa-repeat" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
