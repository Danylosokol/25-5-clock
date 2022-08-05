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
          <i
            className="fa fa-arrow-down"
            id="break-decrement"
            aria-hidden="true"
            onClick={this.props.handler}
          ></i>
          <div id="break-length"> {this.props.value} </div>
          <i
            className="fa fa-arrow-up"
            id="break-increment"
            aria-hidden="true"
            onClick={this.props.handler}
          ></i>
        </div>
      </div>
    );
  }
}

export default Break;
