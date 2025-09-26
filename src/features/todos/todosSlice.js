import { createSlice } from "@reduxjs/toolkit";


const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      // action.payload: { title, content }
      const now = new Date().toISOString();
      state.push({
        id: Date.now(),
        title: action.payload.title,
        content: action.payload.content || "",
        status: false, 
        createdAt: now,
        updatedAt: now,
      });
    },
    updateTodo: (state, action) => {
      
      const todo = state.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
        todo.content = action.payload.content;
        todo.updatedAt = new Date().toISOString();
      }
    },
    toggleTodo: (state, action) => {
      const todo = state.find((t) => t.id === action.payload);
      if (todo) {
        todo.status = !todo.status;
        todo.updatedAt = new Date().toISOString();
      }
    },
    deleteTodo: (state, action) => {
      return state.filter((t) => t.id !== action.payload);
    },
    setTodos: (state, action) => {
      
      return action.payload;
    },
  },
});

export const { addTodo, updateTodo, toggleTodo, deleteTodo, setTodos } = todosSlice.actions;
export default todosSlice.reducer;
