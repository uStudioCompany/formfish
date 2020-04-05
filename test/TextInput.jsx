import React from 'react';

export const TextInput = ({ label, value, onChange }) => {
  return (
    <label>
      {label}

      <input
        type="text"
        value={value}
        onChange={({ target: { value: inputValue } }) => onChange(inputValue)}
      />
    </label>
  );
};
