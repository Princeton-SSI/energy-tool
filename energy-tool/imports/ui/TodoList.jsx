import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import Task from './Task.jsx';
import ReactDOM from 'react-dom';

// App component - represents the whole app
export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boxText: '',
      tasks: {},
      hideCompleted: false,
      taskId: 0,
    };
  }

  // Fired when task is deleted
  handleRemoveTask(taskId) {
    let tmp = this.state.tasks;
    delete tmp[taskId];
    this.setState({
      tasks: tmp,
    });
  }

  // Fired when task is toggled completed/not completed
  handleToggleChecked(taskId) {
    let tmpDict = this.state.tasks;
    let tmpTask = tmpDict[taskId];
    tmpTask.checked = !tmpTask.checked;
    tmpDict[taskId] = tmpTask;
    this.setState({
      tasks: tmpDict,
    });
  }

  // Fired any time user types key
  handleTextChange(newText) {
    console.log("newText: " + newText.target.value);
    this.setState({
      boxText: newText.target.value,
    });
  }

  // Fired when user toggles show/high completed
  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  // Fired when user creates the task
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    console.log("boxText: " + text);

    // Insert new task
    let tmp = this.state.tasks;
    tmp[this.state.taskId] = {
      text: text,
      checked: false,
      taskId: this.state.taskId,
    };

    this.setState({
      tasks: tmp,
      taskId: this.state.taskId + 1,
      boxText: '',
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  renderTasks() {
    let filteredTasks = [];
    for (let taskId in this.state.tasks) {
      filteredTasks.push(this.state.tasks[taskId]);
    }

    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }

    return filteredTasks.map((task) => {
      return (
          <Task
            key={task.taskId.toString()}
            onRemoveTask={this.handleRemoveTask.bind(this)}
            onToggleChecked={this.handleToggleChecked.bind(this)}
            task={task}
          />
      );
    });
  }

  render() {
    const genericForm = (
      <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
          <input
            type="text"
            ref="textInput"
            placeholder="Type to add new tasks"
          />
      </form>
    );

    // Insert this button
    const formButton = (
      <Button onClick={this.handleSubmit.bind(this)}>
        Submit
      </Button>
    );

    const bootstrapForm = (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <FormGroup
          controlId="formBasicText">
          <ControlLabel>Enter New Task</ControlLabel>
          <FormControl
            type="text"
            ref="textInput"
            value={this.state.boxText}
            placeholder="Type to add new tasks"
            onChange={this.handleTextChange.bind(this)}
          />
        </FormGroup>
        {formButton}
      </form>
    );

    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Hide Completed Tasks
          </label>

          {bootstrapForm}

        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

