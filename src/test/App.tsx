import React, { useState } from 'react';
import Field from '../components/Field';
import FieldSet from '../components/FieldSet';
import Form from '../components/Form';
import { Input } from './Input';

const encode = (value = '') => value;
const decode = (value = '') => value;

const App: React.FC = () => {
  const handleSubmit = (formState: unknown) => console.log(formState);
  const watch = (value: unknown) => console.log(value);

  const Check = ({
    value,
    defaultValue,
    onChange
  }: {
    value?: boolean;
    defaultValue?: boolean;
    onChange?: (value: boolean) => void;
  }) => {
    return (
      <input
        type="checkbox"
        defaultChecked={defaultValue}
        checked={value}
        onChange={({ target: { checked } }) => {
          if (onChange) {
            onChange(checked);
          }
        }}
      />
    );
  };

  return (
    <Form name="form" nameSeparator="-" onSubmit={handleSubmit}>
      <FieldSet name="fieldset">
        <Field name="check" watch={watch}>
          <Check defaultValue={false} />
        </Field>
      </FieldSet>

      <button type="submit">Submit</button>
    </Form>
  );
};

export default App;
