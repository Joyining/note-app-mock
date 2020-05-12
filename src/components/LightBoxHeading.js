import React, { Component } from "react";
import { connect } from "react-redux";
import "../scss/components/list.scss";

class LightBoxHeading extends Component {
  render() {
    const { headingTitle, toggleLightBox } = this.props;
    return (
      <div className="heading-wrap">
        <h4>{headingTitle}</h4>
        <button className="cancel-icon" onClick={toggleLightBox}>
          <svg
            onClick={toggleLightBox}
            width="13"
            height="13"
            viewBox="0 0 13 13"
            xmlns="http://www.w3.org/2000/svg"
            id="qa-DELETE_CONFIRM_DIALOG_CLOSE"
          >
            <path
              onClick={toggleLightBox}
              d="M7.728 6.314l4.95-4.95L11.263-.05 6.313 4.9 1.365-.05-.05 1.364l4.95 4.95-4.95 4.95 1.414 1.414 4.95-4.95 4.95 4.95 1.414-1.415-4.95-4.95z"
            ></path>
          </svg>
        </button>
      </div>
    );
  }
}

export default connect(null)(LightBoxHeading);
