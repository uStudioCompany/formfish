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

  const [ids, setIds] = useState([1, 2, 3, 4, 5]);

  return (
    <Form name="form" nameSeparator="-" onSubmit={handleSubmit}>
      <FieldSet name="fieldset">
        {ids.map(id => (
          <div key={id}>
            <Field name={`top-field-${id}`}>
              <Input defaultValue="blabla" />
            </Field>

            <button type="button" onClick={() => setIds(ids.filter(oldId => oldId !== id))}>
              Remove {id}
            </button>
          </div>
        ))}
      </FieldSet>

      <button type="submit">Submit</button>
    </Form>
  );
};

export default App;
