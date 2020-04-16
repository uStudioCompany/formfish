import React from 'react';

export const Input = ({
  value,
  defaultValue,
  onChange
}: {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}) => {
  return (
    <input
      type="text"
      value={value ?? defaultValue}
      onChange={({ target: { value: inputValue } }) => onChange && onChange(inputValue)}
    />
  );
};
