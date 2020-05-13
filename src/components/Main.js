import React, { Component } from "react";
import { connect } from "react-redux";
import NoteList from "./NoteList";
import Editor from "./Editor";
import NoteBookList from "./NoteBookList";
import "../scss/base/_base.scss";

class Main extends Component {
  renderView = () => {
    const { currentView } = this.props;
    switch (currentView) {
      case "notebookList":
        return (
          <div className="main-wrap">
            <NoteBookList />
          </div>
        );
      case "noteAndEditor":
      default:
        return (
          <div className="main-wrap">
            <NoteList />
            <Editor />
          </div>
        );
    }
  };

  render() {
    return this.renderView();
  }
}

const mapStateToProps = (state) => {
  const currentView = state.currentView;
  return { currentView };
};

export default connect(mapStateToProps)(Main);
