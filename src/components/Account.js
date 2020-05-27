import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import * as utils from "../utils";
import { ReactComponent as ExpandIcon } from "../images/arrowDown.svg";

const Account = (props) => {
  const { logOut, currentUser, cookies } = props;
  const [showMenu, setShowMenu] = useState(false);

  const menuOnClickHandler = () => {
    setShowMenu(showMenu ? false : true);
  };

  const logOutOnClickHandler = () => {
    cookies.remove("isLogedIn");
    cookies.remove("currentUser");
    logOut();
  };

  const menu = [{ name: "Log Out", onClick: logOutOnClickHandler }];

  return (
    <div>
      <div className="account-menu-wrap" onClick={menuOnClickHandler}>
        <p className="current-user">
          {utils.getCurrentUser(cookies, currentUser)}
        </p>
        <ExpandIcon className="expand-icon" />
        <ul className={showMenu ? "shared-menu-list show" : "shared-menu-list"}>
          {menu.map((item) => {
            return (
              <li key={item.name} className="menu-item" onClick={item.onClick}>
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const currentUser = state.currentUser;
  const isLogedIn = state.isLogedIn;
  return { currentUser, isLogedIn };
};

export default connect(mapStateToProps, actions)(Account);
