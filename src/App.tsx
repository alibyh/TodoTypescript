//app.tsx

import "./App.css";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoItem from "./components/TodoItem/TodoItem";
import EditTodo from "./components/EditTodo/EditTodo";
import Pagination from "./components/Pagination/Pagination";
import { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { useMyAppDispatch, useMyAppSelector } from "./store/store";
import { fetchTodosAsync, createTodoAsync, updateTodoAsync, deleteTodoAsync, toggleTodoAsync, setSortOption } from "./store/todoSlice";
import type { Todo } from "./api/todos";

function App() {
  const dispatch = useMyAppDispatch();
  const { todos, currentPage, limit, filter, sortOption } = useMyAppSelector((state) => state.todos);
  
  const [editingTodo, setEditingTodo] = useState<Todo>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  let [themColor, setThem] = useState("light");
  let [themColorState, setThemState] = useState(
    localStorage.getItem("Theme") === JSON.stringify("light") ? "#AFB5A9" : "#232323"
  );
  
  const MyStyle = createGlobalStyle`
    body{
      background-color: ${themColorState};
    }
  `;

  useEffect(() => {
    if (!localStorage.getItem("Theme")) {
      localStorage.setItem("Theme", JSON.stringify("dark"));
    }
  }, []);

  // Fetch todos when page, limit, or filter changes
  useEffect(() => {
    dispatch(fetchTodosAsync({ page: currentPage, limit, filter, sortOption: sortOption }));
  }, [dispatch, currentPage, limit, filter, sortOption]);

  function toAdd(todo: { todoText: string }) {
    dispatch(createTodoAsync(todo.todoText));
  }

  function handleIsComp(id: number) {
    dispatch(toggleTodoAsync(id));
  }

  function toDelete(id: number) {
    dispatch(deleteTodoAsync(id));
  }

  function handleEdit(id: number) {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditingTodo(todoToEdit);
    setIsEditModalOpen(true);
  }

  const saveEdit = (updatedText: string) => {
    if (!editingTodo) return;
    dispatch(updateTodoAsync({ id: editingTodo.id, text: updatedText }));
    setIsEditModalOpen(false);
  };

  function handleSort(choice: "newest to oldest" | "oldest to newest") {
    dispatch(setSortOption(choice));
  }

  function handleTheme(params: 'dark' | 'light') {
    console.log(params);
    localStorage.setItem("Theme", JSON.stringify(params));
    setThem(JSON.stringify(params));
    console.log(themColor);
    if (params === "dark") {
      setThemState("#232323");
    } else {
      setThemState("#AFB5A9");
    }
  }


  // Convert API todos to the format expected by TodoItem component
  const convertedTodos = todos.map(todo => ({
    id: todo.id.toString(),
    todoText: todo.text,
    isComp: todo.completed
  }));


  return (
    <>
      <MyStyle></MyStyle>
      <AddTodo onTextSubmit={toAdd}></AddTodo>
      <Pagination />
      <TodoItem
        onEdit={handleEdit}
        isComp={handleIsComp}
        onDelete={toDelete}
        myTodo={convertedTodos}
        todoOption={handleSort}
        theTheme={handleTheme}
      />
      <EditTodo
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        todo={editingTodo ? {
          id: editingTodo.id.toString(),
          todoText: editingTodo.text,
          isComp: editingTodo.completed
        } : undefined}
        onSave={saveEdit}
      />
    </>
  );
}

export default App;
