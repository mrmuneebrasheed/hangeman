import React from "react";
class Button extends React.Component {
  render() {
    return (
      <button
        onClick={this.props.onClick}
        id={this.props.id}
        className="btn btn-danger m-1 p-3"
      >
        {this.props.children}
      </button>
    );
  }
}
export default Button;
