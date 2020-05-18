import React, { Component } from "react";
import HomeContainer from "./components/HomeContainer";
import { withCookies } from "react-cookie";
import "./scss/base/_base.scss";

class App extends Component {
  render() {
    const { cookies } = this.props;
    return <HomeContainer cookies={cookies}></HomeContainer>;
  }
}

export default withCookies(App);
