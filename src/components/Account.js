import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
// import "../scss/components/editorMenu.scss";

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
    const { logOut } = this.props;
    logOut();
  };

  render() {
    const { showMenu } = this.state;
    const { currentUser, isLogedIn } = this.props;
    console.log(isLogedIn);
    const menu = [{ name: "Log Out", onClick: this.logOutOnClickHandler }];
    return (
      <div>
        <div className="account-menu-wrap" onClick={this.menuOnClickHandler}>
          <p>{currentUser.toString()}</p>
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
