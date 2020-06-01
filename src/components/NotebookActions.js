import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import * as utils from "../utils";
import LightBoxBg from "./LightBoxBg";
import DeleteNotebookLightBox from "./DeleteNotebookLightBox";
import { ReactComponent as ActionIcon } from "../images/actionHorizontal.svg";
import "../scss/components/notebookList.scss";

const NotebookActions = (props) => {
  const {
    cookies,
    currentUser,
    notebook,
    notebookId,
    setAsDefaultNotebook,
  } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [showLightBox, setShowLightBox] = useState(false);
  const [currentLightBox, setCurrentLightBox] = useState("");
  const getCurrentUser = utils.getCurrentUser(cookies, currentUser);

  const renderLightBoxMessage = () => {
    switch (currentLightBox) {
      case "deleteNotebook":
        return (
          <DeleteNotebookLightBox
            toggleLightBox={toggleLightBox}
            notebook={notebook}
            notebookId={notebookId}
          />
        );
      default:
        break;
    }
  };

  const actionOnClickHandler = () => {
    setShowMenu((previousShowMenu) => !previousShowMenu);
  };

  const toggleLightBox = (e) => {
    if (e.target === e.currentTarget) {
      setShowLightBox((previousShowLightBox) => !previousShowLightBox);
    }
  };

  const setAsDefaultOnClickHandler = () => {
    setAsDefaultNotebook(notebookId, getCurrentUser);
    setShowMenu((previousShowMenu) => !previousShowMenu);
  };

  const deleteNotebookOnClickHandler = (e) => {
    setCurrentLightBox("deleteNotebook");
    toggleLightBox(e);
    setShowMenu((previousShowMenu) => !previousShowMenu);
  };

  const menu = [
    {
      name: "Set as Default Notebook",
      onClick: setAsDefaultOnClickHandler,
    },
    {
      name: "Delete Notebook",
      onClick: deleteNotebookOnClickHandler,
    },
  ];
  return (
    <div>
      <div className={`actions detail-item ${notebookId}`}>
        <ActionIcon className="icon" onClick={actionOnClickHandler} />
        <ul className={`shared-menu-list ${showMenu ? "show" : ""}`}>
          {menu.map((item) => {
            return (
              <li key={item.name} className="menu-item" onClick={item.onClick}>
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
      <LightBoxBg
        showLightBox={showLightBox}
        toggleLightBox={toggleLightBox}
        renderLightBoxMessage={renderLightBoxMessage}
      ></LightBoxBg>
    </div>
  );
};

const mapStateToProps = (state) => {
  const defaultNotebook = state.defaultNotebook;
  const currentUser = state.currentUser;
  return { currentUser, defaultNotebook };
};

export default connect(mapStateToProps, actions)(NotebookActions);
