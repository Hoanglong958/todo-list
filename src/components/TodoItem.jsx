
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo, updateTodo } from "../features/todos/todosSlice";

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editContent, setEditContent] = useState(todo.content);

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleDelete = () => {
    const ok = window.confirm("Bạn có chắc chắn muốn xoá task này?");
    if (ok) {
      dispatch(deleteTodo(todo.id));
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleEditSave = () => {
    if (editTitle.trim()) {
      dispatch(updateTodo({ id: todo.id, title: editTitle, content: editContent }));
      setEditing(false);
    }
  };

  const handleEditKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleEditSave();
    } else if (e.key === 'Escape') {
      setEditing(false);
      setEditTitle(todo.title);
      setEditContent(todo.content);
    }
  };

  return (
    <div className={`todo-item todo-v2 ${todo.status ? "done" : ""}`}>
      <label className="chk">
        <input
          type="checkbox"
          checked={!!todo.status}
          onChange={handleToggle}
        />
      </label>
      <div className="content">
        {editing ? (
          <>
            <input
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              onBlur={handleEditSave}
              onKeyDown={handleEditKey}
              autoFocus
              style={{fontWeight:600, fontSize:'1.08em', marginBottom:4, borderRadius:8, border:'1.5px solid #b3b3e6', padding:'4px 8px', width:'100%'}}
            />
            <textarea
              value={editContent}
              onChange={e => setEditContent(e.target.value)}
              onBlur={handleEditSave}
              onKeyDown={handleEditKey}
              rows={2}
              style={{fontSize:'1em', borderRadius:8, border:'1.5px solid #b3b3e6', padding:'4px 8px', width:'100%', marginTop:2}}
            />
          </>
        ) : (
          <>
            <span className="title" style={{fontWeight:600, fontSize:'1.08em'}}>{todo.title}</span>
            {todo.content && (
              <div className="desc" style={{ color: '#555', fontSize: '1em', marginTop: 2 }}>
                {todo.content}
              </div>
            )}
            <div className="updatedAt" style={{color:'#b3b3b3', fontSize:'0.95em', marginTop:4}}>
              Cập nhật: {todo.updatedAt ? new Date(todo.updatedAt).toLocaleTimeString('vi-VN', {hour:'2-digit',minute:'2-digit'}) + ' ' + new Date(todo.updatedAt).toLocaleDateString('vi-VN') : ''}
            </div>
          </>
        )}
      </div>
      <div style={{display:'flex', gap:8}}>
        <button className="edit-btn" onClick={handleEdit} disabled={editing}>Sửa</button>
        <button className="del" onClick={handleDelete}>
          X
        </button>
      </div>
    </div>
  );
}
