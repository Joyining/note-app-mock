import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Side from "./Side";
import Main from "./Main";
import MobileTop from "./MobileTop";
import MobileBottom from "./MobileBottom";
import Registration from "./Registration";
import "../scss/base/_base.scss";

const HomeContainer = (props) => {
  const { isLogedIn, cookies, currentUser } = props;

  useEffect(() => {
    if (isLogedIn === true) {
      cookies.set("isLogedIn", true, { path: "/" });
      cookies.set("currentUser", currentUser, { path: "/" });
    }
  });

  if (cookies.get("isLogedIn") === "true" || isLogedIn === true) {
    return (
      <div className="home-container-wrap">
        <MobileTop />
        <Side cookies={cookies} />
        <Main cookies={cookies} />
        <MobileBottom cookies={cookies} />
      </div>
    );
  } else {
    return (
      <div className="home-container-wrap">
        <Registration />
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const isLogedIn = state.isLogedIn;
  const currentUser = state.currentUser;
  const cookies = ownProps.cookies;
  return { isLogedIn, currentUser, cookies };
};

export default connect(mapStateToProps, actions)(HomeContainer);
