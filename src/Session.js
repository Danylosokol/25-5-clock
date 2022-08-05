import React from "react";

class Session extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div id="session-controls">
        <div id="session-label">Session Length</div>
        <div>
          <button id="session-decrement" onClick={this.props.handler}>
            <i className="fa fa-arrow-down" aria-hidden="true"></i>
          </button>
          <div id="session-length"> {this.props.value} </div>
          <button id="session-increment" onClick={this.props.handler}>
            <i className="fa fa-arrow-up" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default Session;