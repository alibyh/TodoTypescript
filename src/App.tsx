//app.tsx

import "./App.css";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoItem from "./components/TodoItem/TodoItem";
import type { todoType } from "./components/AddTodo/AddTodo";
import EditTodo from "./components/EditTodo/EditTodo";
import { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";

function App() {
  const [todos, setTodos] = useState<todoType[]>([]);
  const [editingTodo, setEditingTodo] = useState<todoType>();
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
    const storedTodos = Object.keys(localStorage).map((key) => {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    });
    setTodos(storedTodos);
  }, []);

  function toAdd(todo: todoType) {
    localStorage.setItem(`${Date.now()}`, JSON.stringify(todo));
    setTodos((prev) => [...prev, todo]);
    console.log(themColor)
  }
  function handleIsComp(id: string) {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          const updatedTodo = { ...todo, isComp: !todo.isComp };
          localStorage.setItem(id, JSON.stringify(updatedTodo));
          return updatedTodo;
        }
        return todo;
      })
    );
    console.log(id);
  }
  function toDelete(id: string) {
    localStorage.removeItem(id);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }
  function handleEdit(id: string) {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditingTodo(todoToEdit);
    setIsEditModalOpen(true);
  }
  const saveEdit = (updatedText: string) => {
    if (!editingTodo) return;
    const updatedTodo = {
      ...editingTodo,
      todoText: updatedText,
    };
    localStorage.setItem(editingTodo.id, JSON.stringify(updatedTodo));
    setTodos((prev) =>
      prev.map((todo) => (todo.id === editingTodo.id ? updatedTodo : todo))
    );
    setIsEditModalOpen(false);
  };
  function handleSort(choice: string) {
    setTodos((prevTodos) => {
      const todosCopy = [...prevTodos].filter((todo) => todo?.id);

      switch (choice) {
        case "oldest to newest":
          return todosCopy.sort((a, b) =>
            (b.id || "").localeCompare(a.id || "")
          );
        case "newest to oldest":
          return todosCopy.sort((a, b) =>
            (a.id || "").localeCompare(b.id || "")
          );
        default:
          return todosCopy;
      }
    });
  }
  function handleTheme(params:'dark'|'light') {
    console.log(params)
    localStorage.setItem("Theme", JSON.stringify(params));
    setThem(JSON.stringify(params));
    if (params === "dark") {
      setThemState("#232323");
    } else {
      setThemState("#AFB5A9");
    }
  }
  return (
    <>
      <MyStyle></MyStyle>
      <AddTodo onTextSubmit={toAdd}></AddTodo>
      <TodoItem
        onEdit={handleEdit}
        isComp={handleIsComp}
        onDelete={toDelete}
        myTodo={todos}
        todoOption={handleSort}
        theTheme={handleTheme}
      />
      <EditTodo
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        todo={editingTodo}
        onSave={saveEdit}
      />
    </>
  );
}

export default App;
