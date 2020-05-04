import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import ListItem from "./ListItem";
import "./style.css";

class List extends Component {
  constructor(props) {
    super(props);
  }

  renderNote() {
    const { stateNotes } = this.props;
    console.log(stateNotes);
    const notes = _.map(stateNotes, (note) => {
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
  console.log(state); // {notes: Array(10)}
  const stateNotes = state.notes;
  console.log(stateNotes); // (10) [n, n, n, n, n, n, n, n, n, n]
  return { stateNotes };
};

export default connect(mapStateToProps, actions)(List);
