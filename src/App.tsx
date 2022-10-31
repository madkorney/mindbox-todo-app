import React, { useEffect, useState } from 'react';

import ToDoList from 'components/ToDoList/toDoList';
import FilterTabs from 'components/FilterTabs/filterTabs';
import ActiveItemsCounter from 'components/ActiveItemsCounter/activeItemsCounter';
import InputNewItem from 'components/InputNewItem/inputNewItem';

import { ToDoListItem, Mock_List, Actions, Filters, ItemsNumberToDisplay } from './data/data';
import StorageWorker from './util/localStorage';

import './App.css';

const App = () => {
  const [toDoListItems, setToDoListItems] = useState<ToDoListItem[]>(
    StorageWorker.toDoList || Mock_List
  );
  const [toDoListItemsFiltered, setToDoListItemsFiltered] = useState<ToDoListItem[]>(
    StorageWorker.toDoList || Mock_List
  );
  const [activeFilter, setActiveFilter] = useState<Filters>(Filters.all);
  const [activeItemsNumber, setActiveItemsNumber] = useState(
    toDoListItems.filter((item) => !item.completed).length
  );
  const [scrollIndexPosition, setScrollIndexPosition] = useState(0);

  useEffect(() => {
    const activeItemsNum = toDoListItems.filter((item) => !item.completed).length;
    setActiveItemsNumber(activeItemsNum);
  }, [toDoListItems]);

  useEffect(() => {
    let filteredList: ToDoListItem[];
    switch (activeFilter) {
      case Filters.all:
        filteredList = toDoListItems.slice();
        break;
      case Filters.active:
        filteredList = toDoListItems.filter((item) => !item.completed);
        break;
      case Filters.completed:
        filteredList = toDoListItems.filter((item) => item.completed);
        break;
    }
    setToDoListItemsFiltered(filteredList);
  }, [toDoListItems, activeFilter]);

  useEffect(() => {
    if (toDoListItemsFiltered.length < ItemsNumberToDisplay) {
      setScrollIndexPosition(0);
    } else if (toDoListItemsFiltered.length - ItemsNumberToDisplay < scrollIndexPosition) {
      setScrollIndexPosition(toDoListItemsFiltered.length - ItemsNumberToDisplay);
    }
  }, [toDoListItemsFiltered, scrollIndexPosition]);

  useEffect(() => {
    setScrollIndexPosition(0);
  }, [activeFilter]);

  const clearCompleted = () => {
    const clearedList = toDoListItems.filter((item) => !item.completed);
    setToDoListItems(clearedList);
  };

  const updateItemHandler = (argz: {
    item?: ToDoListItem;
    newItemText?: string;
    action: Actions;
  }) => {
    const { item, newItemText, action } = argz;

    const itemIndex = item ? toDoListItems.findIndex((listItem) => listItem.id === item.id) : -1;
    const updatedList = toDoListItems.slice();

    switch (action) {
      case Actions.update:
        if (itemIndex !== -1) {
          const newItem = { ...item! };
          updatedList.splice(itemIndex, 1, newItem);
          setToDoListItems(updatedList);
        }
        break;

      case Actions.add:
        const maxId = updatedList.reduce((maxid, curr) => Math.max(maxid, curr.id), 0);
        const newItem: ToDoListItem = {
          id: maxId + 1,
          text: newItemText || '---',
          completed: false,
        };
        updatedList.push(newItem);
        setToDoListItems(updatedList);
        break;

      case Actions.delete:
        if (itemIndex !== -1) {
          updatedList.splice(itemIndex, 1);
          setToDoListItems(updatedList);
        }
        break;
    }
  };

  const scrollItemsListDown = () => {
    setScrollIndexPosition(
      Math.min(toDoListItemsFiltered.length - ItemsNumberToDisplay, scrollIndexPosition + 1)
    );
  };

  const scrollItemsListUp = () => {
    setScrollIndexPosition(Math.max(0, scrollIndexPosition - 1));
  };
  return (
    <div className="App">
      <div className="title">ToDo App</div>

      <InputNewItem
        handler={(newItemTextInput: string) => {
          updateItemHandler({ newItemText: newItemTextInput, action: Actions.add });
        }}
      />

      <FilterTabs
        activeFilter={activeFilter}
        handler={(newFilter: Filters) => {
          setActiveFilter(newFilter);
        }}
      />

      <ToDoList
        todoList={toDoListItemsFiltered}
        updateHandler={updateItemHandler}
        scrollIndexPosition={scrollIndexPosition}
      />

      <div className="list-controls">
        <ActiveItemsCounter activeItemsQty={activeItemsNumber} />

        <button className="btn-clear" onClick={clearCompleted}>
          clear completed
        </button>

        <button className="scroll-btn" onClick={scrollItemsListUp}>
          ▲
        </button>

        <button className="scroll-btn" onClick={scrollItemsListDown}>
          ▼
        </button>
      </div>

      <div className="git-link">
        <a href="https://github.com/madkorney">Proudly made on Earth</a>
      </div>
    </div>
  );
};

export default App;
