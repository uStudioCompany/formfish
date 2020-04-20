import React from 'react';
import Field from '../components/Field';
import FieldSet from '../components/FieldSet';
import Form from '../components/Form';
import { Input } from './Input';

const encode = (value = '') => value;
const decode = (value = '') => value;

const App: React.FC = () => {
  const handleSubmit = (formState: unknown) => console.log(formState);
  const watch = (value: unknown) => console.log(value);

  return (
    <Form name="form" nameSeparator="-" onSubmit={handleSubmit}>
      <FieldSet name="topmost-array">
        <Field name="top-field">
          <Input defaultValue="blabla" />
        </Field>
      </FieldSet>

      <button type="submit">Submit</button>
    </Form>
  );
};

export default App;
