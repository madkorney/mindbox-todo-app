import React from 'react';
import { render, screen } from '@testing-library/react';

import { ToDoListItem } from '../../data/data';

import ToDoList from './toDoList';

describe('ToDoList component tests', () => {
  const Mock_List: ToDoListItem[] = [
    { id: 0, text: 'Test task 1', completed: false },
    { id: 1, text: 'Test task 2', completed: true },
    { id: 2, text: 'Test task 3', completed: false },
  ];

  test('should render list with provided item list data', () => {
    render(
      <ToDoList
        updateHandler={() => {}}
        todoList={Mock_List}
        scrollIndexPosition={0}
        itemsToDisplayMax={10}
      />
    );

    const taskText1 = screen.getByText(Mock_List[0].text);
    expect(taskText1).toBeInTheDocument();
    const taskText2 = screen.getByText(Mock_List[1].text);
    expect(taskText2).toBeInTheDocument();
    const taskText3 = screen.getByText(Mock_List[2].text);
    expect(taskText3).toBeInTheDocument();
    const list = screen.getAllByText(/task/i);
    expect(list.length).toBe(3);
  });

  test('should render not more than itemsToDisplayMax items from provided list', () => {
    render(
      <ToDoList
        updateHandler={() => {}}
        todoList={Mock_List}
        scrollIndexPosition={0}
        itemsToDisplayMax={2}
      />
    );

    const list = screen.getAllByText(/task/i);
    expect(list.length).toBe(2);
  });
});
