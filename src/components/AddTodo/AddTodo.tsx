//AddTodo.tsx

import Button from "../Buttons/Buttons";
import React, { useState } from "react";
import { useMyAppSelector } from "../../store/store";

import "./AddTodo.css";

export type todoType = {
  id: string;
  todoText: string;
  isComp: boolean;
};
interface AddTodoProps {
  onTextSubmit: (todo: todoType) => void;
}
const AddTodo = ({ onTextSubmit }: AddTodoProps) => {

  const myTodos = useMyAppSelector((state) => state.todos);
  const [text, setTex] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleTex(e: React.ChangeEvent<HTMLInputElement>) {

    setTex(e.target.value);
    //    onTextSubmit(tex);
  }
  function handleSubButton() {
    const myArray: string[] = [];
    for (let i = 0; i < myTodos.todos.length; i++) {
      myArray.push(myTodos.todos[i].text);
    }
    if (myArray.includes(text)) {
      setError(true);
      setErrorMessage("Todo already exists");
      return;
    }
    else if(text === "") {
      setError(true);
      setErrorMessage("Please enter a todo");
      return;
    }
    else {
      setError(false);
      const todo = {
        id: `${Date.now()}`,
        todoText: text,
        isComp: false,
      };
      onTextSubmit(todo);
      setTex("");
    }
    
  }
  return (
    <>
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <div className="addContainer">
        <input
          className="todoTaskInput"
          type="text"
          onChange={handleTex}
          value={text}
          placeholder="i am an input"
        />
        <Button myOnClick={handleSubButton}>submit</Button>
      </div>
      {error && <label style={{ color: "red" , marginTop: "30px"}}>{errorMessage}</label>}
    </div>
    </>

  );
};

export default AddTodo;
