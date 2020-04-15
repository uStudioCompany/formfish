import React, { useState } from 'react';
import Field from '../components/Field';
import FieldSet from '../components/FieldSet';
import Form from '../components/Form';

const encode = (value = '') => value;
const decode = (value = '') => value;

const App: React.FC = () => {
  const handleSubmit = (formState: unknown) => console.log(formState);
  const watch = (value: unknown) => console.log(value);
  
  const [val, setVal] = useState('');

  return (
    <Form
      name="form"
      nameSeparator="-"
      onSubmit={handleSubmit}
      getValue={({ target: { value } }) => encode(value)}
      setValue={(value: string) => decode(value)}
      initialState={{
        form: {
          topmostArray: {
            topField: {
              name: 'top-field',
              value: 'blablaljasfljnl14njlnbljasf'
            }
          }
        }
      }}
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

      <input type="text" value={val} onChange={({ target: { value } }) => setVal(value)} />

      <button type="submit">Submit</button>
    </Form>
  );
};

export default App;
