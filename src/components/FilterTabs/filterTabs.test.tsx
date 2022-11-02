import React from 'react';
import { render, screen } from '@testing-library/react';

import { Filters } from '../../data/data';

import FilterTabs from './filterTabs';

describe('FilterTabs component tests', () => {
  test('should render component with three tabs', () => {
    render(<FilterTabs handler={() => {}} activeFilter={Filters.all} />);

    const tab1 = screen.getByText(/all/i);
    expect(tab1).toBeInTheDocument();
    const tab2 = screen.getByText(/active/i);
    expect(tab2).toBeInTheDocument();
    const tab3 = screen.getByText(/completed/i);
    expect(tab3).toBeInTheDocument();
  });

  test('should render tab with class "selected" for tab corresponding to activeFilter prop', () => {
    render(<FilterTabs handler={() => {}} activeFilter={Filters.active} />);

    const tab = screen.getByText(/active/i);
    expect(tab.classList.contains('selected')).toBe(true);
  });
});
