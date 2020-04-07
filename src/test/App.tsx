import React, { ChangeEvent } from 'react';
import { Field, FieldSet, Form } from '../index';

const App: React.FC = () => {
  const handleSubmit = (formState: unknown) => console.log(formState);
  const watch = (value: unknown) => console.log(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => event.target.value;

  return (
    <Form name="form" nameSeparator="-" onSubmit={handleSubmit} getValue={handleChange}>
      <FieldSet name="field-array">
        {['field-one', 'field-two', 'field-three'].map((name, index) => (
          <Field name={name} index={index} key={name}>
            <input type="text" />
          </Field>
        ))}
      </FieldSet>

      <FieldSet name="field object" nameSeparator=" ">
        <Field name="field-four" nameSeparator="-">
          <input type="text" />
        </Field>

        <Field name="field five">
          <input type="text" />
        </Field>
      </FieldSet>
    </Form>
  );
};

export default App;
