import React, { Component } from "react";

const list = [
  {
    title: "React",
    url: "https://facebook.github.io/react/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0
  },

  {
    title: "Redux",
    url: "https://github.com/reactjs/redux",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

function isSearched(searchTerm) {
  return function (item) {
    return (
      !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase())
    ); // some condition which returns true or false
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { list, searchTerm: "" }; // defining initial state in constructor

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this); //f1rst this.onDismiss is for the onDismiss method and 'this' refers to the 'App' class componenet, the second this refers to the onDismiss method but with .bind called on it.
  }

  onSearchChange(event) {
    //method arguments give access to the events e.g onChange
    this.setState({ searchTerm: event.target.value }); // recahing for the value entered into the input field
  }

  onDismiss(id) {
    function isNotId(item) {
      return item.objectID !== id;
    }
    const updatedList = this.state.list.filter(isNotId); //use the filter function to evaluate items on the iist
    this.setState({ list: updatedList }); //update the list
  }

  render() {
    return (
      <div className="App">
        <form>
          <input type="text" onChange={this.onSearchChange} />
        </form>
        {this.state.list.map((item) => (
          <div key={item.objectID}>
            {" "}
            <span>
              <a href={item.url}>{item.title}</a>{" "}
            </span>
            <span>{item.author}</span> <span>{item.num_comments}</span>{" "}
            <span>{item.points}</span>
            <span>
              <button
                onClick={() => this.onDismiss(item.objectID)}
                type="button"
              >
                Dismiss
              </button>
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
