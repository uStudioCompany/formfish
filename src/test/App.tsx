import React from 'react';
import { Field, FieldSet, Form } from '../index';

const App: React.FC = () => {
  const handleSubmit = (formState: unknown) => console.log(formState);
  const watch = (value: unknown) => console.log(value);

  return (
    <Form name="form" nameSeparator="-" onSubmit={handleSubmit} watch={watch}>
      <FieldSet name="field-array">
        {['field-one', 'field-two', 'field-three'].map((name, index) => (
          <Field name={name} index={index} key={name}>
            <input type="text" />
          </Field>
        ))}
      </FieldSet>

      <FieldSet name="field-object">
        <Field name="field-four">
          <input type="text" />
        </Field>

        <Field name="field-five">
          <input type="text" />
        </Field>
      </FieldSet>
    </Form>
  );
};

export default App;