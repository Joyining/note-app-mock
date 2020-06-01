import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import LightBoxHeading from "./LightBoxHeading";

const RenameNotebookLightBox = (props) => {
  const { toggleLightBox, notebook, notebookId, renameNotebook } = props;
  const [notebookName, setNotebookName] = useState(notebook.name);

  const cancelRenameNotebook = (e) => {
    toggleLightBox(e);
    setNotebookName(notebook.name);
  };

  const confirmRenameNotebook = (e) => {
    if (notebookId && notebookName) {
      toggleLightBox(e);
      renameNotebook(notebookId, notebookName);
    }
  };

  return (
    <div className="light-box-message-wrap">
      <LightBoxHeading
        headingTitle="Rename Notebook"
        toggleLightBox={toggleLightBox}
      />
      <p className="message">Name:</p>
      <input
        type="text"
        id="notebookName"
        name="notebookName"
        className="input-text"
        value={notebookName}
        onChange={(e) => {
          setNotebookName(e.target.value);
        }}
      ></input>
      <p className={`small-warning-message ${!notebookName ? "show" : ""}`}>
        Notebook name is required!
      </p>
      <div className="btn-wrap">
        <button className="general-btn btn" onClick={cancelRenameNotebook}>
          Cancel
        </button>
        <button className="highlight-btn btn" onClick={confirmRenameNotebook}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default connect(null, actions)(RenameNotebookLightBox);
