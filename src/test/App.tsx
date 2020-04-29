import React, { useState } from 'react';
import Field from '../components/Field';
import FieldSet from '../components/FieldSet';
import Form from '../components/Form';
import { Input } from './Input';
import Checkbox from 'ustudio-ui/components/Checkbox';

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
      <FieldSet name="topmost">
        <FieldSet name="top">
          <FieldSet name="fieldset" watch={watch}>
            <Field
              name="check"
              renderInput={({ value, setValue }) => <Checkbox value={value as boolean} onChange={setValue} />}
            />
          </FieldSet>
        </FieldSet>
      </FieldSet>

      <button type="submit">Submit</button>
    </Form>
  );
};

export default App;
