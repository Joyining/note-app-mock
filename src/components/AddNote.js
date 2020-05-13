import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { v4 as uuidv4 } from "uuid";
import "../scss/components/addNote.scss";

class AddNote extends Component {
  clickAddNote = () => {
    const { addNote, updateEditingNote, switchView } = this.props;
    const noteId = uuidv4();
    addNote(noteId);
    updateEditingNote(noteId);
    switchView("noteAndEditor");
  };

  render() {
    return (
      <div className="add-btn" onClick={this.clickAddNote}>
        Add
      </div>
    );
  }
}

export default connect(null, actions)(AddNote);
