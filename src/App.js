import React, { Component } from "react";
import "./index.css";
import "./styles.css";

const list = [
  {
    title: "FEM Co",
    url: "https://feministcoalition2020.com/",
    author: "Jane Doe",
    num_comments: 3,
    points: 4,
    objectID: 0
  },

  {
    title: "End SARS",
    url: "https://twitter.com/feminist_co",
    author: "Jemila Don, Jamiu Dan",
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
    const { searchTerm, list } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            {" "}
            Search
          </Search>
        </div>
        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />{" "}
      </div>
    );
  }
}
class Search extends Component {
  render() {
    const { value, onChange, children } = this.props;
    return (
      <form>
        {children} <input type="text" value={value} onChange={onChange} />{" "}
      </form>
    );
  }
}

const Table = ({ list, pattern, onDismiss }) => (
  <div className="table">
    {list.filter(isSearched(pattern)).map((item) => (
      <div key={item.objectID} className="table-row">
        <span>
          <a href={item.url}>{item.title}</a>
        </span>{" "}
        <span>{item.author}</span> <span>{item.num_comments}</span>{" "}
        <span>{item.points}</span>{" "}
        <span>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            {" "}
            Dismiss
          </Button>
        </span>
      </div>
    ))}
  </div>
);

class Button extends Component {
  render() {
    const { onClick, className = "", children } = this.props;
    return (
      <button onClick={onClick} className={className} type="button"></button>
    );
  }
}

export default App;
