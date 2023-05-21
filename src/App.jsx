import { useState } from "react";

import useTodo from "./hooks/useTodo";
import formatDate from "./utils/date";
import "./style.css"
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function App() {
  const { addTodo, error, isFetching, todos, editTodo, deleteTodo } = useTodo();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const [id, setId] = useState(null);

  if (isFetching) {
    return <h3>Carregando...</h3>;
  }

  if (error) {
    return <h3>Erro ao buscar dados </h3>;
  }

  function fillStates(todo) {
    setId(todo._id);
    setTitle(todo.title);

    // const test = todo.date.substring(0, 10);
    const dateFormated = todo.date.split("T")[0];
    setDate(dateFormated);
  }

  function clearState() {
    setDate("");
    setTitle("");
  }

  return (
    <>
    <div className="container">
      
      <div className="formulario">
        <h1>Cadastrar Tarefas</h1>
        <input
          type="text"
          placeholder="Titulo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={80}
        />
        <input
          type="date"
          placeholder="Data"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          onClick={() => {
            if (id) {
              editTodo({ payload: { title, date }, id: id });
              setId(null);
            } else {
              addTodo({ title, date });
            }
            clearState();
          }}
        >
          Salvar
        </button>
      </div>

      <div className="list-group">
  <h1>Lista de Tarefas</h1>
  {todos.map((todo, idx) => (
    <div className="list-item" key={idx} >
      <div className="items-1"><h2>{todo.title}</h2></div>
      <div className="items-2"><h3>{formatDate(todo.date)}</h3></div>
      <div className="items-3">
      <button onClick={() => fillStates(todo)}><FaEdit /></button>
      </div>
      <div className="items-4">
      <button onClick={() => deleteTodo(todo._id)}><FaTrash /></button>
      </div>
    </div>
  ))}
</div>
      </div>
    </>
  );
}