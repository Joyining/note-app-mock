import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import ListItem from "./ListItem";
import "./style.css";

class List extends Component {
  state = {
    showForm: false,
    formValue: "",
  };

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
    const { data } = this.props;
    console.log(data);
    const notes = _.map(data, (item) => {
      console.log(item);
      return <ListItem key={item.id} noteId={item.id} note={item.data()} />;
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

const mapStateToProps = ({ data }) => {
  return {
    data,
  };
};

export default connect(mapStateToProps, actions)(List);
