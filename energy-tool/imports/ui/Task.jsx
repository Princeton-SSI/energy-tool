import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

// Task component - represents a single todo item
export default class Task extends Component {
  constructor(props) {
    super(props);
  }

  handleCheck() {
    // Set the checked property to the opposite of its current value
    this.props.onToggleChecked(this.props.task.taskId);
  }

  handleDelete() {
    this.props.onRemoveTask(this.props.task.taskId);
  }

  render() {
    const taskClassName = classnames({
      checked: this.props.task.checked,
    });

    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.handleDelete.bind(this)}>
          &times;
        </button>
        <input
          type="checkbox"
          readOnly
          checked={this.props.task.checked}
          onClick={this.handleCheck.bind(this)}
        />

        <span className="text">
          Text: {this.props.task.text} | TaskId: {this.props.task.taskId}
        </span>
      </li>
    );
  }
}

Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
};
