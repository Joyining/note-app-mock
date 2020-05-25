import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import * as utils from "../utils";
import { ReactComponent as ExpandIcon } from "../images/arrowDown.svg";

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
            {utils.getCurrentUser(cookies, currentUser)}
          </p>
          <ExpandIcon className="expand-icon" />
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

const mapStateToProps = (state) => {
  const currentUser = state.currentUser;
  const isLogedIn = state.isLogedIn;
  return { currentUser, isLogedIn };
};

export default connect(mapStateToProps, actions)(Account);
