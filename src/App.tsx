import React, { useEffect, useState, useRef } from 'react';

import ToDoList from 'components/ToDoList/toDoList';
import FilterTabs from 'components/FilterTabs/filterTabs';
import ActiveItemsCounter from 'components/ActiveItemsCounter/activeItemsCounter';
import InputNewItem from 'components/InputNewItem/inputNewItem';

import { ToDoListItem, Mock_List, Actions, Filters, TODO_ITEM_HEIGHT_PX } from './data/data';
import StorageWorker from './util/localStorage';
import { useWindowSize, Size } from './util/useSize';

import './App.scss';
import './global-styles/_frames.scss';

const initialItemsNumberInList = 10;

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
  const [itemsNumberToDisplay, setItemsNumberToDisplay] = useState(initialItemsNumberInList);
  const windowSize: Size = useWindowSize();
  const screenDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const otherElementsHeightsPx = 275;
    const height = windowSize.height;
    if (height) {
      setItemsNumberToDisplay(
        Math.trunc((height - otherElementsHeightsPx) / TODO_ITEM_HEIGHT_PX) - 3
      );
    }
  }, [windowSize]);

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
    if (toDoListItemsFiltered.length < itemsNumberToDisplay) {
      setScrollIndexPosition(0);
    } else if (toDoListItemsFiltered.length - itemsNumberToDisplay < scrollIndexPosition) {
      setScrollIndexPosition(toDoListItemsFiltered.length - itemsNumberToDisplay);
    }
  }, [toDoListItemsFiltered, scrollIndexPosition, itemsNumberToDisplay]);

  useEffect(() => {
    setScrollIndexPosition(0);
  }, [activeFilter]);

  const clearCompleted = () => {
    const clearedList = toDoListItems.filter((item) => !item.completed);
    StorageWorker.toDoList = clearedList;
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
        break;

      case Actions.delete:
        if (itemIndex !== -1) {
          updatedList.splice(itemIndex, 1);
        }
        break;
    }
    StorageWorker.toDoList = updatedList;
    setToDoListItems(updatedList);
  };

  const scrollItemsListDown = () => {
    setScrollIndexPosition(
      Math.min(toDoListItemsFiltered.length - itemsNumberToDisplay, scrollIndexPosition + 1)
    );
  };

  const scrollItemsListUp = () => {
    setScrollIndexPosition(Math.max(0, scrollIndexPosition - 1));
  };
  return (
    <div className="App frame-out">
      <div className="title">
        ToDo App
        <div className="sub-title">classic</div>
      </div>

      <div className="frame-in display">
        <div className="screen">
          <div className="screen-container" ref={screenDivRef}>
            <ActiveItemsCounter
              activeItemsQty={activeItemsNumber}
              totalItemsQty={toDoListItems.length}
            />

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
              itemsToDisplayMax={itemsNumberToDisplay}
            />

            <div className="list-controls">
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
          </div>
        </div>
      </div>

      <div className="git-link">
        <a href="https://github.com/madkorney">Proudly made on Earth</a>
      </div>
    </div>
  );
};

export default App;
