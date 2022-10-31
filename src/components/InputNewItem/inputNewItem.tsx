import React, { FormEvent, useState } from 'react';

import './inputNewItem.scss';

type InputProps = {
  handler: (newItemText: string) => void;
};

const InputNewItem = ({ handler }: InputProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newItemText = value;
    setValue('');
    handler(newItemText);
  };

  return (
    <form className="input-container" onSubmit={handleSubmit}>
      <input
        type="text"
        name="item-input"
        value={value}
        className="item-input"
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />

      <input type="submit" className="btn-add-new-item" value="add" />
    </form>
  );
};

export default InputNewItem;
