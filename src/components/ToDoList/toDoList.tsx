import React from 'react';

import ToDoItem from 'components/ToDoItem/toDoItem';

import { ToDoListItem, ItemsNumberToDisplay, UpdateHandler } from '../../data/data';

type ToDoListProps = {
  todoList: ToDoListItem[];
  updateHandler: UpdateHandler;
  scrollIndexPosition: number;
};

const ToDoList = ({ todoList, updateHandler, scrollIndexPosition }: ToDoListProps) => {
  return (
    <div className="todo-list">
      <div className="list-items">
        {todoList.map((item, index) => {
          return index >= scrollIndexPosition &&
            index < scrollIndexPosition + ItemsNumberToDisplay ? (
            <ToDoItem listItem={item} key={item.id} updateHandler={updateHandler} />
          ) : null;
        })}
      </div>
      <div className="list-controls"></div>
    </div>
  );
};

export default ToDoList;
