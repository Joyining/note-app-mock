import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import NoteListItem from "./NoteListItem";
import "../scss/components/noteList.scss";

class NoteList extends Component {
  renderNote() {
    const { allNotes } = this.props;
    const notes = _.map(allNotes, (note) => {
      return <NoteListItem key={note.id} noteId={note.id} note={note.data()} />;
    });
    if (!_.isEmpty(notes)) {
      return notes;
    }
    return (
      <div>
        <h4>You have no more things Note!</h4>
      </div>
    );
  }
  componentDidMount() {
    const { fetchNotes } = this.props;
    fetchNotes();
  }
  render() {
    return (
      <div className="note-list-wrap">
        <div>{this.renderNote()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const allNotes = state.allNotes;
  return { allNotes };
};

export default connect(mapStateToProps, actions)(NoteList);
