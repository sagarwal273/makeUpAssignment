import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";


// A todo app where the user can type in a todo and it will be added to the list
// of todos. The user can also edit and remove a todo from the list.
function App() {
  // TODOs: create two states here.
  // The state of the app is stored in the todos array.
  // The state of the input value should also be stored in a state.
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  //useEffect(() => {
  //const fetchandset = () => {
  //    const todos = axios.get('\todo');
  //    setTodos(todos);
  //  };
  //  fetchandset();
  //}, [])

  function addItem() {
    const newtodo = {
      id: new Date().getTime(),
      text: input
    }
    axios.post('todo', newtodo)
      .then(res => {

      })
    const newtodos = [...todos, newtodo]
    setTodos(newtodos);
    console.log(todos);

    setInput("");

    document.getElementById('input').value = ''
  }

  function handleDelete(id) {
    const filteredtodos = todos.filter((item) =>
      item.id !== id);
    setTodos(filteredtodos)
  }

  {
    axios.get('/todo')
      .then(res => setTodos(res.data))
  }

  return (
    <div className="TODOContainer">
      <div className="TODOInput">
        <input
          id="input"
          type="text"
          placeholder="Add a new todo"
          onChange={e => setInput(e.target.value)}
        />
        <button onClick={addItem}>
          Add
        </button >
      </div>
      <div className="TODOList">

        {todos.map((e) => <div className="TODOItem" key={e.id}>
          <div className="TODOItemText">
            <p>{e.text}</p>
          </div>
          <div className="TODOItemDelete">
            <button className="TODOItemButton" onClick={() => handleDelete(e.id)}>Remove</button>
          </div>

        </div>)
        }

      </div>
    </div>
  );
}

export default App;