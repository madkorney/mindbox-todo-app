import React, { useState } from 'react';

import './toDoCheckBox.scss';

type ToDoCheckboxProps = {
  isChecked: boolean;
  handler: (boxState: boolean) => void;
};

const ToDoCheckbox = ({ isChecked, handler }: ToDoCheckboxProps) => {
  const [checkboxState, setCheckboxState] = useState(isChecked);

  return (
    <div className="todo-checkbox">
      <label className="todo-checkbox-label" role="item-checkbox">
        <input
          type="checkbox"
          checked={checkboxState}
          onChange={() => {
            const state = checkboxState;
            setCheckboxState(!state);
            handler(!state);
          }}
        />
        {checkboxState ? '🗹' : '☐'}
      </label>
    </div>
  );
};

export default ToDoCheckbox;
