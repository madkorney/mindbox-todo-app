import React from 'react';
import { render, screen } from '@testing-library/react';

import { ToDoListItem } from '../../data/data';

import ToDoItem from './toDoItem';

describe('ToDoItem component tests', () => {
  const Mock_List: ToDoListItem[] = [
    { id: 0, text: 'Test task 1', completed: false },
    { id: 1, text: 'Test task 2', completed: true },
    { id: 2, text: 'Test task 3', completed: false },
  ];

  test('should render item component with provided item data', () => {
    render(<ToDoItem listItem={Mock_List[1]} updateHandler={() => {}} />);

    const taskText = screen.getByText(/test task 2/i);
    expect(taskText).toBeInTheDocument();
  });

  test('item component text field should have class "completed" if item.completed == true', () => {
    render(<ToDoItem listItem={Mock_List[1]} updateHandler={() => {}} />);

    const itemText = screen.getByText(/task 2/i);
    expect(itemText.classList.contains('completed')).toBe(true);
  });

  test('item component text field should not have class "completed" if item.completed == false', () => {
    render(<ToDoItem listItem={Mock_List[0]} updateHandler={() => {}} />);

    const itemText = screen.getByText(/task 1/i);
    expect(itemText.classList.contains('completed')).toBe(false);
  });

  test('checkbox label should be checked if item.completed == true', () => {
    render(<ToDoItem listItem={Mock_List[1]} updateHandler={() => {}} />);

    const checkBoxLabel = screen.getByRole('item-checkbox');
    expect(checkBoxLabel).toHaveTextContent('🗹');
  });
});
