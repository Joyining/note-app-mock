import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import AddNotebook from "./AddNotebook";
import NotebookListItem from "./NotebookListItem";
import "../scss/components/notebookList.scss";

class NoteBookList extends Component {
  renderNotebook() {
    const { allNotebooks } = this.props;
    const ntoebooks = _.map(allNotebooks, (notebook) => {
      return (
        <NotebookListItem
          key={notebook.id}
          notebookId={notebook.id}
          notebook={notebook.data()}
        />
      );
    });
    if (!_.isEmpty(ntoebooks)) {
      return ntoebooks;
    }
    return (
      <div>
        <h4>You Don't have any Notebook yet!</h4>
      </div>
    );
  }

  componentDidMount() {
    const { fetchNotebooks } = this.props;
    fetchNotebooks();
  }

  render() {
    return (
      <div>
        <p>this is notebook list</p>
        <AddNotebook></AddNotebook>
        <div>{this.renderNotebook()}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const allNotebooks = state.allNotebooks;
  return { allNotebooks };
};

export default connect(mapStateToProps, actions)(NoteBookList);
