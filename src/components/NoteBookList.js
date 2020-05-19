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
    const { fetchNotebooks, cookies, currentUser } = this.props;
    const getCurrentUser = cookies.get("currentUser")
      ? cookies.get("currentUser")
      : currentUser.toString();
    fetchNotebooks(getCurrentUser);
  }

  render() {
    const { cookies } = this.props;
    return (
      <div className="notebook-list-wrap">
        <p>this is notebook list</p>
        <AddNotebook cookies={cookies}></AddNotebook>
        <div>{this.renderNotebook()}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const allNotebooks = state.allNotebooks;
  const currentUser = state.currentUser;
  return { allNotebooks, currentUser };
};

export default connect(mapStateToProps, actions)(NoteBookList);
