import React, { Component } from "react";
import { connect } from "react-redux";
import { addNote, updateEditingNote } from "../actions";
import { v4 as uuidv4 } from "uuid";
import "../scss/components/menu.scss";

class AddNote extends Component {
  constructor(props) {
    super(props);
  }

  clickAddNote = () => {
    const { addNote, updateEditingNote } = this.props;
    const noteId = uuidv4();
    addNote(noteId, {});
    updateEditingNote(noteId);
  };

  render() {
    return (
      <div className="add-btn" onClick={this.clickAddNote}>
        Add
      </div>
    );
  }
}

export default connect(null, { addNote, updateEditingNote })(AddNote);
