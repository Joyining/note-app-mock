import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { v4 as uuidv4 } from "uuid";
import "../scss/components/addNote.scss";

class AddNote extends Component {
  clickAddNote = () => {
    const {
      addNote,
      currentUser,
      updateEditingNote,
      switchView,
      cookies,
    } = this.props;
    const noteId = uuidv4();
    const getCurrentUser = cookies.get("currentUser")
      ? cookies.get("currentUser")
      : currentUser.toString();
    addNote(noteId, getCurrentUser);
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

const mapStateToProps = (state) => {
  const currentUser = state.currentUser;
  return { currentUser };
};

export default connect(mapStateToProps, actions)(AddNote);
