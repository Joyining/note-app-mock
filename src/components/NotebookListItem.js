import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import "../scss/components/notebookList.scss";

class NotebookListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
  }
  notebookItemOnClickHandler = (e) => {
    const { switchView } = this.props;
    if (e.target === e.currentTarget) {
      switchView("noteAndEditor");
    }
  };
  actionOnClickHandler = () => {
    const { showMenu } = this.state;
    this.setState({
      showMenu: showMenu ? false : true,
    });
  };
  setAsDefaultOnClickHandler = () => {
    const {
      notebookId,
      cookies,
      currentUser,
      setAsDefaultNotebook,
    } = this.props;
    const getCurrentUser = cookies.get("currentUser")
      ? cookies.get("currentUser")
      : currentUser.toString();
    setAsDefaultNotebook(notebookId, getCurrentUser);
  };

  render() {
    const { notebookId, notebook } = this.props;
    const { showMenu } = this.state;
    const menu = [
      {
        name: "Set as Default Notebook",
        onClick: this.setAsDefaultOnClickHandler,
      },
    ];
    return (
      <li
        id={notebookId}
        className="notebook-item-outer"
        onClick={this.notebookItemOnClickHandler}
      >
        <div className="notebook-item-inner">
          <svg
            className="notebook-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
          >
            <path
              fillRule="evenodd"
              d="M3 2v10h7a1 1 0 001-1V3a1 1 0 00-1-1H3zM2 1h8a2 2 0 012 2v8a2 2 0 01-2 2H2V1zm2 1v10h1V2H4zm2 3v1h4V5H6z"
            ></path>
          </svg>
          <span className="notebook-name">{notebook.name}</span>
          <span className="is-default-notebook">
            {notebook.defaultNotebook.toString() === "true"
              ? "Default Notebook"
              : ""}
          </span>
          <div className="actions">
            <div className="icon" onClick={this.actionOnClickHandler}>
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                id="qa-NOTEBOOK_ACTIONS"
              >
                <path d="M16 12c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm-2 0c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-6 0c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z"></path>
              </svg>
            </div>
            <ul
              className={
                showMenu ? "shared-menu-list show" : "shared-menu-list"
              }
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
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  const currentUser = state.currentUser;
  return { currentUser };
};

export default connect(mapStateToProps, actions)(NotebookListItem);
