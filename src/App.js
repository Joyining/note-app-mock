import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import Side from "./components/Side";
import Main from "./components/Main";
import Registration from "./components/Registration";
import "./scss/base/_base.scss";

class App extends Component {
  render() {
    const { isLogedIn } = this.props;
    if (isLogedIn === true) {
      return (
        <div className="app-wrap">
          <Side />
          <Main />
        </div>
      );
    } else {
      return (
        <div className="app-wrap">
          <Registration />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  const isLogedIn = state.isLogedIn;
  return { isLogedIn };
};

export default connect(mapStateToProps, actions)(App);
