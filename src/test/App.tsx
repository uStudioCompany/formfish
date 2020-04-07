import React, { useState } from 'react';
import Field from '../components/Field';
import FieldSet from '../components/FieldSet';
import Form from '../components/Form';

const encode = (value = '') => btoa(value);
const decode = (value = '') => atob(value);

const App: React.FC = () => {
  const handleSubmit = (formState: unknown) => console.log(formState);
  const watch = (value: unknown) => console.log(value);

  const [deletables, setDeletables] = useState([1, 2, 3]);

  const Deletable = ({ index }: { index: number }) => {
    return (
      <Field name={`field-${index}`} getValue={encode} setValue={decode}>
        <input type="text" />
      </Field>
    );
  };

  return (
    <Form name="form" nameSeparator="-" onSubmit={handleSubmit}>
      <FieldSet name="deletables">
        {deletables.map((id) => (
          <div key={id}>
            <Deletable index={id} />

            <button
              type="button"
              onClick={() => {
                setDeletables(deletables.filter(deletable => deletable !== id));
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </FieldSet>
    </Form>
  );
};

export default App;
