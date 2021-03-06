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
    console.log(allNotebooks);
    const notebooks = _.map(allNotebooks, (notebook) => {
      return (
        <Notebook
          key={notebook.id}
          notebookId={notebook.id}
          notebook={notebook.data()}
          cookies={cookies}
        />
      );
    });
    if (!_.isEmpty(notebooks)) {
      return <div className="notebook-list">{notebooks}</div>;
    }
    return (
      <div>
        <h4>You Don't have any Notebook yet!</h4>
      </div>
    );
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
          <div className="table-heading">
            <p className="title-and-icon">
              <span className="cell">Title</span>
            </p>
            <div className="detail-and-actions">
              <p className="last-modified cell">Last Modified</p>
              <p className="is-default-notebook cell">Default Notebook</p>
              <p className="actions cell">Actions</p>
            </div>
          </div>
          <div>{this.renderNotebook()}</div>
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
