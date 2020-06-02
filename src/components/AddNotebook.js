import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import * as utils from "../utils";
import { v4 as uuidv4 } from "uuid";
import LightBoxBg from "./LightBoxBg";
import LightBoxHeading from "./LightBoxHeading";
import { ReactComponent as AddNotebookIcon } from "../images/addNotebook.svg";
import "../scss/components/addNotebook.scss";

const AddNotebook = (props) => {
  const { addNotebook, cookies, currentUser } = props;
  const [showLightBox, setShowLightBox] = useState(false);
  const [notebookName, setNotebookName] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  // 重複了
  const toggleLightBox = (e) => {
    if (e.target === e.currentTarget) {
      setShowLightBox(showLightBox ? false : true);
    }
  };

  const clickAddNotebook = () => {
    setShowLightBox(showLightBox ? false : true);
    setNotebookName("");
    setShowWarning(false);
  };

  const confirmAddNotebook = (e) => {
    const id = uuidv4();
    const getCurrentUser = utils.getCurrentUser(cookies, currentUser);
    if (notebookName) {
      addNotebook(id, getCurrentUser, notebookName);
      toggleLightBox(e);
    } else {
      setShowWarning(true);
    }
  };

  const renderLightBoxMessage = (notebookName, showWarning) => {
    return (
      <div className="light-box-message-wrap">
        <LightBoxHeading
          headingTitle="Create New Notebook"
          toggleLightBox={toggleLightBox}
        />
        <p className="message">Name:</p>
        <input
          type="text"
          id="notebookName"
          name="notebookName"
          className="input-text"
          placeholder="Notebook Name"
          value={notebookName}
          onChange={(e) => {
            setNotebookName(e.target.value);
          }}
        ></input>
        <p className={`small-warning-message ${showWarning ? "show" : ""}`}>
          Notebook name is required!
        </p>
        <div className="btn-wrap">
          <button className="general-btn btn" onClick={toggleLightBox}>
            Cancel
          </button>
          <button className="highlight-btn btn" onClick={confirmAddNotebook}>
            Continue
          </button>
        </div>
      </div>
    );
  };

  const lightBoxParameters = [notebookName, showWarning];
  return (
    <div className="add-notebook-wrap">
      <div className="add-notebook-btn" onClick={clickAddNotebook}>
        <AddNotebookIcon />
        <span>New Notebook</span>
      </div>
      <LightBoxBg
        showLightBox={showLightBox}
        toggleLightBox={toggleLightBox}
        renderLightBoxMessage={renderLightBoxMessage}
        renderParameters={lightBoxParameters}
      ></LightBoxBg>
    </div>
  );
};

const mapStateToProps = (state) => {
  const currentUser = state.currentUser;
  return { currentUser };
};

export default connect(mapStateToProps, actions)(AddNotebook);
