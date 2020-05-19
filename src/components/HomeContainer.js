import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Side from "./Side";
import Main from "./Main";
import Registration from "./Registration";
import "../scss/base/_base.scss";

class HomeContainer extends Component {
  render() {
    const { isLogedIn, cookies } = this.props;
    if (cookies.get("isLogedIn") === "true" || isLogedIn === true) {
      return (
        <div className="home-container-wrap">
          <Side cookies={cookies} />
          <Main cookies={cookies} />
        </div>
      );
    } else {
      return (
        <div className="home-container-wrap">
          <Registration />
        </div>
      );
    }
  }

  componentDidUpdate() {
    const { isLogedIn, currentUser, cookies } = this.props;
    console.log("HomeContainer componentDidUpdate");
    if (isLogedIn === true) {
      cookies.set("isLogedIn", true, { path: "/" });
      cookies.set("currentUser", currentUser, { path: "/" });
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const isLogedIn = state.isLogedIn;
  const currentUser = state.currentUser;
  const cookies = ownProps.cookies;
  return { isLogedIn, currentUser, cookies };
};

export default connect(mapStateToProps, actions)(HomeContainer);
