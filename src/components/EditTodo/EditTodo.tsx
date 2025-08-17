import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './EditTodo.css';
import type { todoType } from '../AddTodo/AddTodo';
import Button from '../Buttons/Buttons';

type Editprop={
    open:boolean,
    onClose(id:string):void,
    todo: todoType|undefined,
    onSave(text:string):void,
}
export default function EditTodo({ open, onClose, todo, onSave }:Editprop) {
  const [editedText, setEditedText] = useState('');
  
  // Update local state when todo prop changes
  useEffect(() => {
    if (todo) {
      setEditedText(todo.todoText);
    }
  }, [todo]);

  if (!open) return null;

  return createPortal(
    <dialog className='modal' open>
      <div className="modal-content">
        <h2 style={{color:'black'}}>Edit Todo</h2>
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="edit-input"
        />
        <div className="modal-actions">
          <Button myOnClick={() => onSave(editedText)}>Save</Button>
          <Button myOnClick={onClose}>Cancel</Button>
        </div>
      </div>
    </dialog>,
    document.getElementById('modalContainer')!
  );
}