import React, { useState } from 'react';
import Field from '../components/Field';
import FieldSet from '../components/FieldSet';
import Form from '../components/Form';

const encode = (value = '') => btoa(value);
const decode = (value = '') => atob(value);

const App: React.FC = () => {
  const handleSubmit = (formState: unknown) => console.log(formState);
  const watch = (value: unknown) => console.log(value);

  return (
    <Form
      name="form"
      nameSeparator="-"
      onSubmit={handleSubmit}
      getValue={(value: string) => encode(value)}
      setValue={(value: string) => decode(value)}
    >
      <FieldSet name="topmost-array">
        <Field name="top-field">
          <input type="text" />
        </Field>

        <Field
          name="inside-field"
          renderInput={({ value = '', setValue }: { value: string; setValue: (value: string) => void }) => (
            <input type="text" value={value} onChange={({ target: { value: inputValue } }) => setValue(inputValue)} />
          )}
        />
      </FieldSet>

      <button type="submit">Submit</button>
    </Form>
  );
};

export default App;
