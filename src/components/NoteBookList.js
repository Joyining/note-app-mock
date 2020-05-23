import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import AddNotebook from "./AddNotebook";
import Notebook from "./Notebook";
import "../scss/components/notebookList.scss";

class NotebookList extends Component {
  renderNotebook() {
    const { allNotebooks, cookies } = this.props;
    const ntoebooks = _.map(allNotebooks, (notebook) => {
      return (
        <Notebook
          key={notebook.id}
          notebookId={notebook.id}
          notebook={notebook.data()}
          cookies={cookies}
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
      <div className="notebook-list-outer-wrap">
        <div className="main-title-wrap">
          <h3>Notebooks</h3>
        </div>
        <div className="secondary-title-wrap">
          <p className="secondary-title">My Notebook List</p>
          <AddNotebook cookies={cookies}></AddNotebook>
        </div>

        <div className="notebook-list-inner-wrap">
          <ul className="table-heading">
            <li className="notebook-name-and-icon">
              <p className="title">Title</p>
            </li>
            <li className="notebook-detail-and-actions">
              <p className="last-modified detail-item">Last Modified</p>
              <p className="is-default-notebook detail-item">
                Default Notebook
              </p>
              <p className="actions detail-item">Actions</p>
            </li>
          </ul>
          {this.renderNotebook()}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const allNotebooks = state.allNotebooks;
  const currentUser = state.currentUser;
  return { allNotebooks, currentUser };
};

export default connect(mapStateToProps, actions)(NotebookList);
