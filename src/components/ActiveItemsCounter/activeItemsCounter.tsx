import React from 'react';

import './activeItemsCounter.scss';

type CounterProps = {
  activeItemsQty: number;
};

const ActiveItemsCounter = ({ activeItemsQty }: CounterProps) => {
  return <div className="counter">{activeItemsQty}</div>;
};

export default ActiveItemsCounter;
