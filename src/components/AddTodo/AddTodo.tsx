//AddTodo.tsx

import Button from "../Buttons/Buttons";
import React, { useState } from "react";
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
  const [text, setTex] = useState("");
  function handleTex(e: React.ChangeEvent<HTMLInputElement>) {
    setTex(e.target.value);
    //    onTextSubmit(tex);
  }
  function handleSubButton() {
    const todo = {
      id: `${Date.now()}`,
      todoText: text,
      isComp: false,
    };
    onTextSubmit(todo);
  }
  return (
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
  );
};

export default AddTodo;
