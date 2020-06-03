import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { ReactComponent as BackIcon } from "../images/arrowLeft.svg";
import "../scss/components/mobileTop.scss";

const MobileTop = (props) => {
  const { switchView, selectedNotebook, currentView } = props;

  const backOnClickHandler = () => {
    switch (currentView) {
      case "deleteNotebookView":
      case "side":
        return;
      case "editNoteView":
      case "addNoteView":
        switchView("noteAndEditor");
        break;
      case "noteAndEditor":
      case "deleteNoteView":
      default:
        switchView("side");
        break;
    }
  };

  const getCurrentPosition = () => {
    switch (currentView) {
      case "editNoteView":
      case "addNoteView":
      case "deleteNotebookView":
      case "side":
        return "";
      case "noteAndEditor":
      case "deleteNoteView":
        return selectedNotebook.name ? selectedNotebook.name : "All Notes";
      default:
        return "All Notes";
    }
  };

  return (
    <div className="mobile-top-wrap">
      <BackIcon
        className={`back-icon ${currentView === "side" ? "hide" : ""}`}
        onClick={backOnClickHandler}
      />
      <span className="current-position">{getCurrentPosition()}</span>
    </div>
  );
};

const mapStateToProps = (state) => {
  const selectedNotebook = state.selectedNotebook;
  const currentView = state.currentView;
  return { selectedNotebook, currentView };
};

export default connect(mapStateToProps, actions)(MobileTop);
