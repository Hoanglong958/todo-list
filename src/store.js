import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./features/todos/todosSlice";


// Lấy todos từ localStorage nếu có
const loadTodos = () => {
  try {
    const data = localStorage.getItem("todos");
    if (data) return JSON.parse(data);
  } catch {}
  return [];
};

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  preloadedState: {
    todos: loadTodos(),
  },
});

// Lưu todos vào localStorage mỗi khi thay đổi
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("todos", JSON.stringify(state.todos));
});

export default store;
