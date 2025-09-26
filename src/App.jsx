import React, { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import Register from "./components/Register";
import { useSelector } from "react-redux";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("isLoggedIn") === "true");
  const [showRegister, setShowRegister] = useState(false);
  const todos = useSelector((state) => state.todos);
  const remaining = todos.filter((t) => !t.status).length;


  if (!isLoggedIn) {
    if (showRegister) {
      return <Register onRegister={() => setShowRegister(false)} onSwitchToLogin={() => setShowRegister(false)} />;
    }
    return <Login onLogin={() => setIsLoggedIn(true)} onSwitchToRegister={() => setShowRegister(true)} />;
  }

  return (
    <div className="container">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 16}}>
        <h2 style={{textAlign: 'center', margin:0}}>Your To Do</h2>
        <button
          style={{background:'#eee', color:'#444', border:'none', borderRadius:12, padding:'7px 18px', fontWeight:500, cursor:'pointer', fontSize:16}}
          onClick={() => {
            localStorage.removeItem('isLoggedIn');
            setIsLoggedIn(false);
          }}
        >Đăng xuất</button>
      </div>
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
