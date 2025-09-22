import "./TodoItem.css";
import Button from "../Buttons/Buttons";
import type { todoType } from "../AddTodo/AddTodo";
import { useState } from "react";
import { H1Head, ListItemLi, ListItemUl, SelectButton, H3div} from "./TodoItem.style";

interface TodoItemProps {
  myTodo?: todoType | todoType[];
  isComp: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  todoOption: (id: 'newest to oldest' | 'oldest to newest') => void;
  theTheme: (id: "dark" | "light") => void;
}

const TodoItem = ({
  myTodo,
  isComp,
  onDelete,
  onEdit,
  todoOption,
  theTheme,
}: TodoItemProps) => {
  const [current, setCurreent] = useState(localStorage.getItem("Theme"));
  let [themColorState, setThemState] = useState(
    localStorage.getItem("Theme") === JSON.stringify("dark") ? "#AFB5A9" : "#232323"
  );
  let [textColorState, setTextState] = useState(
    localStorage.getItem("Theme") === JSON.stringify("dark") ? "white" : "black"
  );
  let [liTextColorState, setLiTextState] = useState(
    localStorage.getItem("Theme") === JSON.stringify("dark") ? "black" : "white"
  );
  const handleBool = (id: string) => () => {
    isComp(parseInt(id));
  };
  const handleDelete = (id: string) => () => {
    onDelete(parseInt(id));
    console.log(current);
  };
  const handleEdit = (id: string) => () => {
    onEdit(parseInt(id));
  };
  const selectTodoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = e.target.value;
    todoOption(sortValue as "newest to oldest" | "oldest to newest");
  };
  
  function handleThem() {
    const themToSend = localStorage.getItem("Theme");
    setCurreent(themToSend);
    if (themToSend === JSON.stringify("dark")) {
      theTheme("light");
      setThemState("#232323");
      setTextState("black");
      setLiTextState("white");
    } else {
      theTheme("dark");
      setThemState("#AFB5A9");
      setTextState("white");
      setLiTextState("black");
    }
  }

  return (
    <div className="toMainContainer">
      <div className="todoHeader">
        <div className="header-left">
          <Button myOnClick={handleThem}> change theme</Button>
          <H1Head headcolor={textColorState}> My Todo List</H1Head>
        </div>

        <SelectButton
          name="sort"
          id="sort"
          onChange={selectTodoChange}
          headcolor={textColorState}
        >
          <option value="newest to oldest">newest to oldest</option>
          <option value="oldest to newest">oldest to newest</option>
        </SelectButton>
      </div>
      <ListItemUl>
        {Array.isArray(myTodo) ? (
          myTodo
            .filter((key) => key.isComp === false)
            .map((local: todoType) => (
              <ListItemLi
                key={local.id}
                headcolor={liTextColorState}
                backgroundcolor={themColorState}
              >
                <span style={{ textAlign: "center" }}>{local.todoText}</span>
                <div className="taskRight">
                  <Button myOnClick={handleDelete(local.id)}>🗑️</Button>
                  <Button myOnClick={handleEdit(local.id)}>✍️</Button>
                  <Button myOnClick={handleBool(local.id)}>✅</Button>
                </div>
              </ListItemLi>
            ))
        ) : (
          <span style={{ textAlign: "center" }}>nope</span>
        )}
      </ListItemUl>
      <H3div headcolor={textColorState}>completed ✅:</H3div>
      <ListItemUl>
        {Array.isArray(myTodo) ? (
          myTodo
            .filter((key) => key.isComp === true)
            .map((local: todoType) => (
              <ListItemLi
                key={local.id}
                headcolor={liTextColorState}
                backgroundcolor={themColorState}
              >
                <span style={{ textAlign: "center" }}>{local.todoText}</span>
                <div className="taskRight">
                  <Button myOnClick={handleDelete(local.id)}>🗑️</Button>
                  <Button myOnClick={handleEdit(local.id)}>✍️</Button>
                  <Button myOnClick={handleBool(local.id)}>✅</Button>
                </div>
              </ListItemLi>
            ))
        ) : (
          <span style={{ textAlign: "center" }}>nope</span>
        )}
      </ListItemUl>
    </div>
  );
};

export default TodoItem;
