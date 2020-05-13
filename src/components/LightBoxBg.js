import React, { Component } from "react";
import { connect } from "react-redux";

class LightBoxBg extends Component {
  render() {
    const { showLightBox, toggleLightBox, renderLightBoxMessage } = this.props;
    return (
      <div
        className={showLightBox ? "light-box show" : "light-box"}
        onClick={toggleLightBox}
      >
        {renderLightBoxMessage()}
      </div>
    );
  }
}

export default connect(null)(LightBoxBg);
