import React, { createContext, Dispatch, useEffect, useReducer, useState } from 'react';
import Checkbox from 'ustudio-ui/components/Checkbox';
import Text from 'ustudio-ui/components/Text';
import Field from '../components/Field';
import FieldSet from '../components/FieldSet';
import Form from '../components/Form';
import { Input } from './Input';

const encode = (value = '') => value;
const decode = (value = '') => value;

const Ctx = createContext(
  {} as { state: { value: boolean }; setValue: Dispatch<{ type: 'set_value'; payload: boolean }> }
);

const reducer = (state: { value: boolean }, action: { type: 'set_value'; payload: boolean }) => {
  return { ...state, value: action.payload };
};

const CtxProvider: React.FC = ({ children }) => {
  const [state, setValue] = useReducer(reducer, { value: false });

  return <Ctx.Provider value={{ state, setValue }}>{children}</Ctx.Provider>;
};

const Req: React.FC<{
  state: { value: boolean };
  dispatch: Dispatch<{ type: 'set_value'; payload: boolean }>;
  isActive: boolean;
}> = ({ state, dispatch, isActive }) => {
  const [value, setValue] = useState(state.value);

  useEffect(() => {
    dispatch({ type: 'set_value', payload: value });
  }, [value]);

  return (
    <>
      <Field name="Text" watch={setValue}>
        <Checkbox aria-label={`${value}`} isDisabled={!isActive} />
      </Field>

      <Text color={state.value ? 'pink' : 'green'}>{`${state.value}`}</Text>
    </>
  );
};

const App: React.FC = () => {
  const handleSubmit = (formState: unknown) => console.log(formState);
  const watch = (value: unknown) => console.log(value);

  const [isActive, setActive] = useState(false);

  return (
    <CtxProvider>
      <Form name="form" nameSeparator="-" onSubmit={handleSubmit}>
        <FieldSet name="topmost">
          <FieldSet name="top">
            <FieldSet name="fieldset">
              <Ctx.Consumer>{({ state, setValue }) => <Req state={state} dispatch={setValue} isActive={isActive} />}</Ctx.Consumer>
            </FieldSet>
          </FieldSet>
        </FieldSet>

        <Checkbox value={isActive} onChange={setActive} />

        <button type="submit">Submit</button>
      </Form>
    </CtxProvider>
  );
};

export default App;
