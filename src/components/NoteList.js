import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import Note from "./Note";
import Notebook from "./Notebook";
import "../scss/components/noteList.scss";

class NoteList extends Component {
  renderNote() {
    const { allNotes, cookies } = this.props;
    const notes = _.map(allNotes, (note) => {
      return (
        <Note
          key={note.id}
          noteId={note.id}
          content={note.content}
          lastModifiedTime={note.lastModifiedTime}
          cookies={cookies}
        />
      );
    });
    if (!_.isEmpty(notes)) {
      return notes;
    }
    return <div>{/* <h4>You Don't have any Note yet!</h4> */}</div>;
  }
  componentDidMount() {
    const { fetchNotes } = this.props;
    // fetchNotes();
  }
  render() {
    const { selectedNotebook, defaultNotebook, cookies, allNotes } = this.props;
    const currentNotebook = {
      id: selectedNotebook.id ? selectedNotebook.id : "allNotes",
      name: selectedNotebook.name ? selectedNotebook.name : "All Notes",
      notes: allNotes,
      defaultNotebook:
        defaultNotebook.id === selectedNotebook.id ? true : false,
      lastModifiedTime: selectedNotebook.lastModifiedTime
        ? selectedNotebook.lastModifiedTime
        : null,
    };
    return (
      <div className="note-list-wrap">
        {/* <Notebook
          notebookId={`${currentNotebook.id}`} // id會跟SideMenu裡的Notebook重複？
          notebook={currentNotebook}
          cookies={cookies}
        /> */}
        <div>{this.renderNote()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const allNotes = state.allNotes;
  const selectedNotebook = state.selectedNotebook;
  const defaultNotebook = state.defaultNotebook;
  return { allNotes, selectedNotebook, defaultNotebook };
};

export default connect(mapStateToProps, actions)(NoteList);
