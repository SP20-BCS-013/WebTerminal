import React, { Component } from "react";

class ToDoList extends Component {
  state = {
    num: 0,
    todos: [],
    todo: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let todos = this.state.todos;
    todos.push(this.state.todo);
    this.setState({ todos });
  };

  onChange = (todo) => {
    this.setState({ todo });
  };

  handleDelete = (todo) => {
    let todos = this.state.todos.filter((t) => t !== todo);

    this.setState({ todos });
  };

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            data-testid="input"
            type="text"
            name="todo"
            className="searchBar"
            placeholder="Add ToDo"
            onChange={(e) => this.onChange(e.currentTarget.value)}
          />
          <button className="button">Add</button>
        </form>

        {this.state.todos.map((todo, index) => (
          <div key={index}>
            <h1>
              {index + 1}.) {todo}
            </h1>
            <button onClick={() => this.handleDelete(todo)}>Delete</button>
          </div>
        ))}
      </div>
    );
  }
}

export default ToDoList;
