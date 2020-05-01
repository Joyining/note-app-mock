import React, { Component } from "react";
import { connect } from "react-redux";
import { completeNote } from "../actions";
import "./style.css";

class ListItem extends Component {
  completeClick = (completeNoteId) => {
    const { completeNote } = this.props;
    completeNote(completeNoteId);
  };
  render() {
    const { noteId, note } = this.props;
    return (
      <div key="noteName" className="col s10 offset-s1 note-list-item black">
        <h4>
          {note.title}
          <span
            onClick={() => this.completeClick(noteId)}
            className="complete-note-item waves-effect waves-light blue lighten-5 blue-text text-darken-4 btn"
          >
            <i className="large material-icons">Done</i>
          </span>
        </h4>
      </div>
    );
  }
}

export default connect(null, { completeNote })(ListItem);

// This file will render each individual Note item. Each item will contain a button which when clicked will deem the Note as completed and remove it from the list. This is achieved with the help of the completeNote action that we had created in the actions section of this post. The actions are connected to the component with the help of the connect method of react-redux library.
