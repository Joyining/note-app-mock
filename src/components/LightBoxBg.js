import React, { Component } from "react";
import { connect } from "react-redux";
import "../scss/components/lightbox.scss";

class LightBoxBg extends Component {
  isIterable = (obj) => {
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === "function";
  };
  render() {
    const {
      showLightBox,
      toggleLightBox,
      renderLightBoxMessage,
      renderParameters,
    } = this.props;

    return (
      <div
        className={showLightBox ? "light-box show" : "light-box"}
        onClick={toggleLightBox}
      >
        {this.isIterable(renderParameters)
          ? renderLightBoxMessage(...renderParameters)
          : renderLightBoxMessage(renderParameters)}
      </div>
    );
  }
}

export default connect(null)(LightBoxBg);
