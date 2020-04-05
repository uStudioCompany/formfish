import React from 'react';
import { array, object, string } from 'yup';
import { Field } from '../src/components/Field/Field';
import { FieldArray } from '../src/components/FieldArray/index';
import { FieldSet } from '../src/components/FieldSet/index';
import { Form } from '../src/components/Form';
import { TextInput } from './TextInput';

export const App = () => {
  return (
    <Form
      name="tender"
      onSubmit={console.log}
      schema={{
        outer: object({
          value: string().required()
        }),
        set: object({
          inner: object({
            value: string().required()
          })
        }),
        array: array().of(object({
          value: string().required()
        }))
      }}
    >
      <Field name="outer">
        <TextInput />
      </Field>

      <FieldSet name="set">
        <Field name="inner">
          <TextInput />
        </Field>
      </FieldSet>
      
      <FieldArray name='array'>
        {
          ['one', 'two'].map((name, index) => (
            <Field name={name} key={name} index={index}>
              <TextInput/>
            </Field>
          ))
        }
      </FieldArray>

      <button>Submit</button>
    </Form>
  );
};
