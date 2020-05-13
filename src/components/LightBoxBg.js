import React, { Component } from "react";
import { connect } from "react-redux";
import "../scss/components/lightbox.scss";

class LightBoxBg extends Component {
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
        {renderLightBoxMessage(renderParameters)}
      </div>
    );
  }
}

export default connect(null)(LightBoxBg);
