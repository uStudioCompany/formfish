import React from 'react';
import { useForm } from '../hooks';

export const Input = ({
  value,
  defaultValue,
  onChange
}: {
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
}) => {
  const watch = useForm('form.topmost');

  console.log(watch);

  return (
    <input
      type="checkbox"
      checked={value ?? defaultValue}
      onChange={({ target: { checked: inputValue } }) => onChange && onChange(inputValue)}
    />
  );
};
