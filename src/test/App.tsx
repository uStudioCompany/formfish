import React, { useState } from 'react';
import Field from '../components/Field';
import FieldSet from '../components/FieldSet';
import Form from '../components/Form';

const encode = (value = '') => btoa(value);
const decode = (value = '') => atob(value);

const App: React.FC = () => {
  const handleSubmit = (formState: unknown) => console.log(formState);
  const watch = (value: unknown) => console.log(value);

  const [arr, setArr] = useState([0, 1, 2, 3, 4]);

  return (
    <Form
      name="form"
      nameSeparator="-"
      onSubmit={handleSubmit}
      getValue={({ target: { value = '' } }) => encode(value)}
      setValue={(value: string) => decode(value)}
    >
      <FieldSet name="topmost-array">
        {arr.map(key => (
          <div key={key}>
            <FieldSet name="top-array" index={key}>
              <Field index={0} name="top-field">
                <input type="text" />
              </Field>

              <FieldSet index={1} name="inside-array">
                <Field index={0} name="inside-field">
                  <input type="text" />
                </Field>
              </FieldSet>
            </FieldSet>

            <button type="button" onClick={() => setArr(arr.filter(id => id !== key))}>
              Delete
            </button>
          </div>
        ))}
      </FieldSet>

      <button type="submit">Submit</button>
    </Form>
  );
};

export default App;
