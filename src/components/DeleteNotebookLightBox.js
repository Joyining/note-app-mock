import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import LightBoxHeading from "./LightBoxHeading";

const DeleteNotebookLightBox = (props) => {
  // confirmDeleteNote = (e) => {
  //   const { editingNote, deleteNote, toggleLightBox } = this.props;
  //   toggleLightBox(e);
  //   if (editingNote.id) {
  //     deleteNote(editingNote.notebookId, editingNote.id);
  //   }
  // };
  const { toggleLightBox, defaultNotebook, notebook, notebookId } = props;

  const renderLightBoxMessage = () => {
    if (defaultNotebook.id === notebookId) {
      return (
        <p className="message">
          {" "}
          <span className="notebook-title"> "{notebook.name}" </span>
          is Default Notebook.
        </p>
      );
    } else {
      return (
        <div>
          <p className="message">
            Your Notebook
            <span className="notebook-title"> "{notebook.name}" </span>
            Will be Moved to Trash.
          </p>
          <div className="btn-wrap">
            <button className="general-btn btn" onClick={toggleLightBox}>
              Cancel
            </button>
            {/* <button className="warning-btn btn" onClick={this.confirmDeleteNote}>
            Delete
          </button> */}
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
