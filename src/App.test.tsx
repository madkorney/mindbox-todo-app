import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('main App component tests', () => {
  test('should render sub components tabs controls, clear button, scroll buttons', () => {
    render(<App />);

    const title = screen.getByText(/todo app/i);
    expect(title).toBeInTheDocument();
    const tab1 = screen.getByText(/all/i);
    expect(tab1).toBeInTheDocument();
    const hasActive = screen.getAllByText(/active/i);
    expect(hasActive.length).toBe(3);
    const hasCompleted = screen.getAllByText(/completed/i);
    expect(hasCompleted.length).toBe(2);

    const clearButton = screen.getByText(/clear completed/i);
    expect(clearButton).toBeInTheDocument();
    const scrollUp = screen.getByText('▲');
    expect(scrollUp).toBeInTheDocument();
    const scollDown = screen.getByText('▼');
    expect(scollDown).toBeInTheDocument();
  });
});
