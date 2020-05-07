import React, { createContext, useState } from 'react';
import Checkbox from 'ustudio-ui/components/Checkbox';
import Text from 'ustudio-ui/components/Text';
import Field from '../components/Field';
import FieldSet from '../components/FieldSet';
import Form from '../components/Form';
import { Input } from './Input';

const encode = (value = '') => value;
const decode = (value = '') => value;

const Ctx = createContext({} as { value: boolean; setValue: (value: boolean) => void });

const CtxProvider: React.FC = ({ children }) => {
  const [value, setValue] = useState(false);

  return <Ctx.Provider value={{ value, setValue }}>{children}</Ctx.Provider>;
};

const App: React.FC = () => {
  const handleSubmit = (formState: unknown) => console.log(formState);
  const watch = (value: unknown) => console.log(value);

  const [value, setValue] = useState(false);

  return (
    <CtxProvider>
      <Form name="form" nameSeparator="-" onSubmit={handleSubmit}>
        <FieldSet name="topmost">
          <FieldSet name="top">
            <FieldSet name="fieldset">
              <Field name="Text" watch={setValue}>
                <Checkbox />
              </Field>

              <Text color={value ? 'pink' : 'green'}>{`${value}`}</Text>
            </FieldSet>
          </FieldSet>
        </FieldSet>

        <button type="submit">Submit</button>
      </Form>
    </CtxProvider>
  );
};

export default App;
