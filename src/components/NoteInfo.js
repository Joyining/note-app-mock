import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class NoteInfo extends Component {
  render() {
    const { notebookName, lastModifiedDay } = this.props;
    return (
      <div className="note-info">
        <p>{notebookName}</p>
        <p>Last Modified At: {lastModifiedDay}</p>
      </div>
    );
  }
}

export default NoteInfo;
