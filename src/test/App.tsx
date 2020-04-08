import React, { useState } from 'react';
import Field from '../components/Field';
import FieldSet from '../components/FieldSet';
import Form from '../components/Form';

const encode = (value = '') => btoa(value);
const decode = (value = '') => atob(value);

const App: React.FC = () => {
  const handleSubmit = (formState: unknown) => console.log(formState);
  const watch = (value: unknown) => console.log(value);

  const [isTop, setTop] = useState(true);

  return (
    <Form
      name="form"
      nameSeparator="-"
      onSubmit={handleSubmit}
      getValue={({ target: { value = '' } }) => encode(value)}
      setValue={(value: string) => decode(value)}
    >
      {isTop ? (
        <FieldSet name="top-array">
          <Field index={0} name="top-field">
            <input type="text" />
          </Field>

          <FieldSet index={1} name="inside-array">
            <Field index={0} name="inside-field">
              <input type="text" />
            </Field>
          </FieldSet>
        </FieldSet>
      ) : (
        <></>
      )}

      <button type="button" onClick={() => setTop(false)}>
        Delete top
      </button>

      <button type="submit">Submit</button>
    </Form>
  );
};

export default App;
