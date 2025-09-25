import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todos/todosSlice";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTodo({ title, content }));
      setTitle("");
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form form-v2">
      <input
        type="text"
        placeholder="Add new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-title"
      />
      <textarea
        placeholder="Add new task title"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="input-content"
        rows={3}
      />
      <div style={{display:'flex', justifyContent:'flex-end', width:'100%'}}>
        <button type="submit" className="btn-add">Thêm</button>
      </div>
    </form>
  );
}
