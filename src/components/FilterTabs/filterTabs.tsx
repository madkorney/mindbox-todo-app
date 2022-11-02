import React from 'react';

import { Filters } from 'data/data';

import './filterTabs.scss';

type TabProps = {
  activeFilter: Filters;
  handler: (filter: Filters) => void;
};

const FilterTabs = ({ activeFilter, handler }: TabProps) => {
  return (
    <div className="tabs">
      <button
        className={activeFilter === Filters.all ? 'selected' : ''}
        onClick={() => {
          handler(Filters.all);
        }}
      >
        all
      </button>

      <button
        className={activeFilter === Filters.active ? 'selected' : ''}
        onClick={() => {
          handler(Filters.active);
        }}
      >
        active
      </button>

      <button
        className={activeFilter === Filters.completed ? 'selected' : ''}
        onClick={() => {
          handler(Filters.completed);
        }}
      >
        completed
      </button>
    </div>
  );
};

export default FilterTabs;
