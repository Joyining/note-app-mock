import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteNote } from "../actions";
import LightBoxHeading from "./LightBoxHeading";
import "../scss/components/list.scss";

class DeleteNoteLightBox extends Component {
  confirmDeleteNote = (e) => {
    const { editingNote, deleteNote, toggleLightBox } = this.props;
    toggleLightBox(e);
    if (editingNote.id) {
      deleteNote(editingNote.id);
    }
  };

  render() {
    const { editingNote, toggleLightBox } = this.props;
    return (
      <div className="light-box-message-wrap">
        <LightBoxHeading
          headingTitle="Delete Note"
          toggleLightBox={toggleLightBox}
        />
        <p className="message">
          Your Note
          <span className="note-title"> "{editingNote.title}" </span>
          Will be Moved to Trash.
        </p>
        <div className="btn-wrap">
          <button className="general-btn btn" onClick={toggleLightBox}>
            Cancel
          </button>
          <button className="warning-btn btn" onClick={this.confirmDeleteNote}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const editingNote = state.editingNote;
  return { editingNote };
};

export default connect(mapStateToProps, { deleteNote })(DeleteNoteLightBox);
