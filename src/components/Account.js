import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
  }

  menuOnClickHandler = () => {
    const { showMenu } = this.state;
    this.setState({
      showMenu: showMenu ? false : true,
    });
  };

  logOutOnClickHandler = () => {
    const { logOut, cookies } = this.props;
    cookies.remove("isLogedIn");
    cookies.remove("currentUser");
    logOut();
  };

  render() {
    const { showMenu } = this.state;
    const { currentUser, isLogedIn, cookies } = this.props;
    const menu = [{ name: "Log Out", onClick: this.logOutOnClickHandler }];
    return (
      <div>
        <div className="account-menu-wrap" onClick={this.menuOnClickHandler}>
          <p className="current-user">
            {cookies.get("currentUser")
              ? cookies.get("currentUser")
              : currentUser.toString()}
          </p>
          <svg
            className="expand-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 8 8"
          >
            <path fill="none" d="M7 2L4 5 1 2"></path>
          </svg>
          <ul
            className={showMenu ? "shared-menu-list show" : "shared-menu-list"}
          >
            {menu.map((item) => {
              return (
                <li
                  key={item.name}
                  className="menu-item"
                  onClick={item.onClick}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const currentUser = state.currentUser;
  const isLogedIn = state.isLogedIn;
  const cookies = ownProps.cookies;
  return { currentUser, isLogedIn, cookies };
};

export default connect(mapStateToProps, actions)(Account);
