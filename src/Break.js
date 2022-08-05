import React from "react";

class Break extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="break-controls">
        <div id="break-label">Break Length</div>
        <div>
          <div id="break-decrement" onClick={this.props.handler}>
            <i className="fa fa-arrow-down" aria-hidden="true"></i>
          </div>
          <div id="break-length"> {this.props.value} </div>
          <div id="break-increment" onClick={this.props.handler}>
            <i className="fa fa-arrow-up" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default Break;
