import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Account from "./Account";
import AddNote from "./AddNote";
import { ReactComponent as NoteMenu } from "../images/allNote.svg";
import "../scss/components/mobileBottom.scss";

const MobileBottom = (props) => {
  const { switchView, cookies } = props;

  const noteMenuOnClickHandler = () => {
    switchView("side");
  };

  return (
    <div className="mobile-bottom-wrap">
      <NoteMenu className="note-menu" onClick={noteMenuOnClickHandler} />
      <AddNote cookies={cookies}></AddNote>
      {/* <Account cookies={cookies}></Account> */}
    </div>
  );
};

export default connect(null, actions)(MobileBottom);
