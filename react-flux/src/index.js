var React = require('react');
var ReactDOM = require('react-dom');
var TodoStore = require('./stores/TodoStore.js');
var TodoActions = require('./actions/TodoActions.js');

var TodoItem = React.createClass({

  render: function() {
    return(
      <tr>
        <td>{this.props.item}</td>
        <td>
          <button onClick={this._delete}>
            Delete
          </button>
        </td>
      </tr>
    )
  },
  _delete: function() {
    console.log('Deleting item key: ' + this.props.index);
    TodoActions.removeItem(this.props.index);
  }
});
var EditTodo = React.createClass({
  getInitialState: function() {
    return {
      text: ''
    }
  },
  render: function() {
    return(
      <tr>
        <td><input
            type="text"
            value={this.state.text}
            onChange={this._onChange}
            onKeyDown={this._catchEnter}
            placeholder="Add new todo..."
          /></td>
        <td>
          <button
            onClick={this._save}>Add
          </button>
        </td>
      </tr>
    )
  },
  _onChange: function(e) {
    this.setState({
      text: e.target.value
    });
  },
  _save: function() {
    TodoActions.saveItem(this.state.text);
  },
  _catchEnter: function(e) {
    if(e.keyCode === 13) {
      this._save();
    }
  }
});

var TodoList = React.createClass({
  render: function() {
    var rows = [];
    if(this.props.list) {
      this.props.list.map(function(item, index) {
        rows.push(<TodoItem key={index} index={index} item={item} />);
      });
    }
    if(this.props.editing) {
      rows.push(<EditTodo key={-1} />);
    }
    return(
      <div>
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
      </div>
    )
  }
});

var AddTodo = React.createClass({
  render: function() {
    return(
      <div>
      <button onClick={this._add} >
        Add To do
      </button>
      <button onClick={this._random}>
        Get Random Todo From Api
      </button>
    </div>
    )
  },
  _add: function() {
    TodoActions.addItem();
  },
  _random: function() {
    TodoActions.getRandom();
  }
});

var TodoApp = React.createClass({
  getInitialState: function() {
    return TodoStore.getList();
  },

  componentDidMount: function() {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(TodoStore.getList());
  },

  render: function() {
    return(
      <div>
        <AddTodo />
        <div>
          <TodoList list={this.state.list} editing={this.state.editing} />
        </div>
      </div>
    )
  }
});

ReactDOM.render(
  <TodoApp />
  , document.getElementById('app')
);
