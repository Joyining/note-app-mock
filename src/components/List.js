import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import ListItem from "./ListItem";
import "./style.css";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      formValue: "",
    };
  }

  inputChange = (e) => {
    this.setState({ formValue: e.target.value });
  };

  formSubmit = (e) => {
    const { formValue } = this.state;
    const { addNote } = this.props;
    e.preventDefault();
    addNote({ title: formValue });
    this.setState({ formValue: "" });
  };

  renderForm = () => {
    const { showForm, formValue } = this.state;
    if (showForm) {
      return (
        <div>
          <form onSubmit={this.formSubmit}>
            <div>
              <i>add</i>
              <input
                value={formValue}
                onChange={this.inputChange}
                id="NoteNext"
                type="text"
              />
              <label htmlFor="NoteNext">What Next?</label>
              <button type="submit">submit</button>
            </div>
          </form>
        </div>
      );
    }
  };
  renderNote() {
    const { stateNotes } = this.props;
    console.log(stateNotes);
    const notes = _.map(stateNotes, (note) => {
      console.log(note);
      return <ListItem key={note.id} noteId={note.id} note={note.data()} />;
    });
    if (!_.isEmpty(notes)) {
      return notes;
    }
    return (
      <div>
        <h4>You have no more things Note!</h4>
      </div>
    );
  }
  componentDidMount() {
    this.props.fetchNotes();
  }
  render() {
    const { showForm } = this.state;
    return (
      <div>
        <div>
          {this.renderForm()}
          {this.renderNote()}
        </div>
        <div>
          <button onClick={() => this.setState({ showForm: !showForm })}>
            {showForm ? <i>Close</i> : <i>Add</i>}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state); // {notes: Array(10)}
  const stateNotes = state.notes;
  console.log(stateNotes); // (10) [n, n, n, n, n, n, n, n, n, n]
  return { stateNotes };
};

export default connect(mapStateToProps, actions)(List);
