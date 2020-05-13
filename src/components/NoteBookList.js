import React, { Component } from "react";
import AddNotebook from "./AddNotebook";
import "../scss/components/noteBookList.scss";

class NoteBookList extends Component {
  render() {
    return (
      <div>
        <p>this is notebook list</p>
        <AddNotebook></AddNotebook>
      </div>
    );
  }
}
export default NoteBookList;
