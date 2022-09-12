import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [msg, setMsg] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [incompletedTodos, setIncompletedTodos] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedOption, setSelectedOption] = useState('All tasks');
  const [toggleResult, setOptionResult] = useState([]);

  const submitHandler = (event) => {
    event.preventDefault();
    let newTodo = { msg, isCompleted };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    if (isCompleted === true) {
      const completedTodo = [...completedTodos, newTodo];
      setCompletedTodos(completedTodo);
    } else {
      const incompletedTodo = [...incompletedTodos, newTodo];
      setIncompletedTodos(incompletedTodo);
    }
    setMsg('');
  };

  function todoClickToggleHandler(todo) {
    todo.isCompleted = !todo.isCompleted;
    const trueTodos = todos.filter((todo) => todo.isCompleted === true);
    setCompletedTodos(trueTodos);
    const falseTodos = todos.filter((todo) => todo.isCompleted === false);
    setIncompletedTodos(falseTodos);
  }

  function deleteHandler(index) {
    const remainingTodos = todos.filter((item, i) => i !== index);
    setTodos(remainingTodos);
  }

  function selectHandler(e) {
    const options = e.target.value;
    setSelectedOption(options);
  }

  function searchHandler(event) {
    const searchString = event.target.value;
    const filteredtodos = todos.filter((todo) =>
      todo.msg.toLowerCase().includes(searchString.trim().toLowerCase())
    );
    setSearchResults(filteredtodos);
  }

  useEffect(() => {
    console.log('todos:');
    console.log(todos);
    console.log('CompletedTodos');
    console.log(completedTodos);
    console.log('incompletedTodos');
    console.log(incompletedTodos);
    console.log("Toggle Option is: " + selectedOption);
    if (selectedOption === 'All tasks') {
      setOptionResult(todos);
    } else if (selectedOption === 'Completed tasks') {
      setOptionResult(completedTodos);
    } else if (selectedOption === 'incompleted tasks') {
      setOptionResult(incompletedTodos);
    }
  }, [todos, completedTodos, incompletedTodos, selectedOption, toggleResult]);

  return (
    <div className="App">
      <h2>Welcome to todo Application</h2>
      <hr />
      <form onSubmit={submitHandler}>
        <input
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          value={msg}
          type="text"
          placeholder="Enter message"
        ></input>
        <div>
          <input
            onChange={() => {
              setIsCompleted(!isCompleted);
            }}
            type="checkbox"
            id="isCompleted"
            value={isCompleted}
          />
          <label htmlFor="isCompleted"> Is it Completed</label>
        </div>
        <button type="submit">Save</button>
      </form>
      <hr />
      <h2>All tasks</h2>
      <ul>
        {todos.map((todo, index) => (
          <h3
            style={{
              color: todo.isCompleted ? 'green' : 'red',
              borderColor: todo.isCompleted ? 'green' : 'red',
            }}
            key={index}
            // onClick={() => {
            //   todoClickToggleHandler(todo);
            // }}
          >
            {todo.msg}
            <button
              className="btn btn-primary"
              onClick={() => todoClickToggleHandler(todo)}
            >
              Update
            </button>
            <button
              className="btn btn-info"
              onClick={() => deleteHandler(index)}
            >
              Delete
            </button>
          </h3>
        ))}
      </ul>
      <hr />

      <div className="">
        <label htmlFor="tasks">Toggle button: </label>
        <select
          id="tasks"
          value={selectedOption}
          onChange={(e) => {
            selectHandler(e);
          }}
        >
          <option value="">--Select--</option>
          <option value="All tasks">All tasks</option>
          <option value="Completed tasks">Completed tasks</option>
          <option value="incompleted tasks">Incompleted tasks</option>
        </select>
        {/* <div>{selectedOption}</div> */}
        <div>
          {toggleResult.map((todo, index) => (
            <h3
              style={{
                color: todo.isCompleted ? 'green' : 'red',
                borderColor: todo.isCompleted ? 'green' : 'red',
              }}
              key={index}
            >
              {todo.msg}
            </h3>
          ))}
        </div>
      </div>
      {/* <hr />
      <h2>Completed tasks</h2>
      <div>
        {completedTodos.map((todo, index) => (
          <h3
            style={{
              color: 'green',
              borderColor: 'green',
            }}
            key={index}
          >
            {todo.msg} &nbsp;
          </h3>
        ))}
      </div>
      <hr />
      <h2>Incompleted tasks</h2>
      <div>
        {incompletedTodos.sort().map((todo, index) => (
          <h3
            style={{
              color: 'red',
              borderColor: 'red',
            }}
            key={index}
          >
            {todo.msg} &nbsp;
          </h3>
        ))}
      </div> */}

      <hr />

      <input onChange={searchHandler} placeholder="search msgs here" />
      <div>
        {searchResults.map((todo, index) => (
          <h3 key={index}>{todo.msg}</h3>
        ))}
      </div>
    </div>
  );
}

export default App;
