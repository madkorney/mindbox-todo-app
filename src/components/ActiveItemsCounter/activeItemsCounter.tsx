import React from 'react';

import './activeItemsCounter.scss';

type CounterProps = {
  activeItemsQty: number;
  totalItemsQty: number;
};

const ActiveItemsCounter = ({ activeItemsQty, totalItemsQty }: CounterProps) => {
  return (
    <div className="status-line">
      <div className="active-items-num-label-long">active items:</div>
      <div className="active-items-num-label-short">active/total:</div>
      <div className="output">{activeItemsQty.toString().padStart(2, '0')}</div>
      <div className="all-items-num-label-long">total items:</div>
      <div className="all-items-num-label-short">/</div>
      <div className="output">{totalItemsQty.toString().padStart(2, '0')}</div>
    </div>
  );
};

export default ActiveItemsCounter;
