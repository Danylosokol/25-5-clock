import React from "react";

class Session extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div id="session-controls">
        <div id="session-label">Session</div>
        <div>
          <div id="session-decrement" onClick={this.props.handler}>
            <i className="fa fa-minus" aria-hidden="true"></i>
          </div>
          <div id="session-length"> {this.props.value} </div>
          <div id="session-increment" onClick={this.props.handler}>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default Session;