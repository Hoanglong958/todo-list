import React from "react";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useSelector } from "react-redux";

export default function App() {
  const todos = useSelector((state) => state.todos);
  const remaining = todos.filter((t) => !t.status).length;
  return (
    <div className="container">
      <h2 style={{textAlign: 'center', marginBottom: 16}}>Your To Do</h2>
      <TodoForm />
      <TodoList />
      <div style={{marginTop: 24, fontSize: '1em'}}>
        <b>Your remaining todos : {remaining}</b>
      </div>
      <div style={{marginTop: 8, color: '#888', fontStyle: 'italic', fontSize: '0.95em'}}>
        "Doing what you love is the cornerstone of having abundance in your life." - Wayne Dyer
      </div>
    </div>
  );
}
