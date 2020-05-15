import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import "../scss/components/notebookList.scss";

class NotebookListItem extends Component {
  render() {
    const { notebookId, notebook } = this.props;
    return (
      <div id={notebookId} className="notebook-item-outer">
        <div className="notebook-item-inner">{notebook.name}</div>
      </div>
    );
  }
}

export default connect(null, { actions })(NotebookListItem);
