import React, { useState } from 'react';

import ToDoCheckbox from './ToDoCheckBox/toDoCheckBox';

import { Actions, ToDoListItem, UpdateHandler } from '../../data/data';

import './toDoItem.scss';

type ToDoItemProps = {
  listItem: ToDoListItem;
  updateHandler: UpdateHandler;
};

const ToDoItem = ({ listItem, updateHandler }: ToDoItemProps) => {
  const [itemIsCompleted, setItemIsCompleted] = useState(listItem.completed);
  const [item, setItem] = useState({ ...listItem });

  const checkBoxHandler = (boxState: boolean) => {
    setItemIsCompleted(boxState);
    const updatedItem = { ...item, completed: boxState };
    setItem(updatedItem);
    updateHandler({ item: updatedItem, action: Actions.update });
  };

  return (
    <div className="todo-item">
      <ToDoCheckbox isChecked={itemIsCompleted} handler={checkBoxHandler} />
      <div className="todo-item-id">{item.id}</div>
      <div className={itemIsCompleted ? 'todo-item-text completed' : 'todo-item-text'}>
        {item.text}
      </div>
      <button
        className="btn-item-control"
        onClick={() => {
          updateHandler({ item: item, action: Actions.delete });
        }}
      >
        del
      </button>
    </div>
  );
};

export default ToDoItem;
