import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import LightBoxHeading from "./LightBoxHeading";

const DeleteNotebookLightBox = (props) => {
  const {
    deleteNotebook,
    toggleLightBox,
    defaultNotebook,
    notebook,
    notebookId,
  } = props;

  const confirmDeleteNotebook = (e) => {
    toggleLightBox(e);
    if (notebookId) {
      deleteNotebook(notebookId);
    }
  };

  const renderLightBoxMessage = () => {
    if (defaultNotebook.id === notebookId) {
      return (
        <p className="message">
          <span className="notebook-name"> "{notebook.name}" </span>
          <span> is Default Notebook. </span>
          <span>Set Another Notebook as Default Notebook Before Deleting</span>
          <span className="notebook-name"> "{notebook.name}"</span>
          <span>.</span>
        </p>
      );
    } else {
      return (
        <div>
          <p className="message">
            All Your Notes in Notebook:
            <span className="notebook-name"> "{notebook.name}" </span>
            Will be Moved to Trash.
          </p>
          <div className="btn-wrap">
            <button className="general-btn btn" onClick={toggleLightBox}>
              Cancel
            </button>
            <button className="warning-btn btn" onClick={confirmDeleteNotebook}>
              Delete
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="light-box-message-wrap">
      <LightBoxHeading
        headingTitle="Delete Notebook"
        toggleLightBox={toggleLightBox}
      />
      {renderLightBoxMessage()}
    </div>
  );
};

const mapStateToProps = (state) => {
  const defaultNotebook = state.defaultNotebook;
  return { defaultNotebook };
};

export default connect(mapStateToProps, actions)(DeleteNotebookLightBox);
