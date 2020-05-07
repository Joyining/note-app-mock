import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import ListItem from "./ListItem";
import "../scss/components/list.scss";

class List extends Component {
  renderNote() {
    const { allNotes } = this.props;
    console.log(allNotes);
    const notes = _.map(allNotes, (note) => {
      console.log(note);
      return <ListItem key={note.id} noteId={note.id} note={note.data()} />;
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
    this.props.fetchNotes();
  }
  render() {
    return (
      <div className="list-wrap">
        <div>{this.renderNote()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  const allNotes = state.allNotes;
  console.log(allNotes);
  return { allNotes };
};

export default connect(mapStateToProps, actions)(List);
