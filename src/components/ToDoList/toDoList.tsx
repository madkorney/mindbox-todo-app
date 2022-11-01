import React from 'react';

import ToDoItem from 'components/ToDoItem/toDoItem';

import { ToDoListItem, UpdateHandler } from '../../data/data';

type ToDoListProps = {
  todoList: ToDoListItem[];
  updateHandler: UpdateHandler;
  scrollIndexPosition: number;
  itemsToDisplayMax: number;
};

const ToDoList = ({
  todoList,
  updateHandler,
  scrollIndexPosition,
  itemsToDisplayMax,
}: ToDoListProps) => {
  return (
    <div className="todo-list">
      <div className="list-items">
        {todoList.map((item, index) => {
          return index >= scrollIndexPosition && index < scrollIndexPosition + itemsToDisplayMax ? (
            <ToDoItem listItem={item} key={item.id} updateHandler={updateHandler} />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default ToDoList;
