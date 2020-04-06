import React, { ChangeEvent } from 'react';
import { Field, FieldSet, Form } from '../index';

const App: React.FC = () => {
  const handleSubmit = (formState: unknown) => console.log(formState);
  const watch = (value: unknown) => console.log(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => event.target.value;

  return (
    <Form name="form" nameSeparator="-" onSubmit={handleSubmit}>
      <FieldSet name="field-array">
        {['field-one', 'field-two', 'field-three'].map((name, index) => (
          <Field name={name} index={index} key={name} handleChange={handleChange}>
            <input type="text" />
          </Field>
        ))}
      </FieldSet>

      <FieldSet name="field-object" watch={watch}>
        <Field name="field-four" handleChange={handleChange}>
          <input type="text" />
        </Field>

        <Field name="field-five" handleChange={handleChange}>
          <input type="text" />
        </Field>
      </FieldSet>
    </Form>
  );
};

export default App;
