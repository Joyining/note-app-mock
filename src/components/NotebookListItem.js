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
  actionOnClickHandler = () => {
    const { showMenu } = this.state;
    this.setState({
      showMenu: showMenu ? false : true,
    });
  };
  setAsDefaultOnClickHandler = () => {
    const { notebookId, setAsDefaultNotebook } = this.props;
    setAsDefaultNotebook(notebookId);
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
      <div id={notebookId} className="notebook-item-outer">
        <div className="notebook-item-inner">
          <span>{notebook.name}</span>
          <span>{notebook.defaultNotebook.toString()}</span>
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
      </div>
    );
  }
}

export default connect(null, actions)(NotebookListItem);
