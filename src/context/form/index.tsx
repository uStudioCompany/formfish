import React, { createContext, useContext, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';

import { Field, FormStateContextValue, FormDispatchContextValue, FormState } from './FormContext';
import formReducer from './reducer';

export const FormStateContext = createContext<FormStateContextValue | undefined>(undefined);
export const FormDispatchContext = createContext<FormDispatchContextValue | undefined>(undefined);

const FormContextProvider: React.FC = ({ children }) => {
  const [formState, dispatch] = useReducer(formReducer, {});

  const { state } = useMemo<{ state: FormState }>(
    () => ({
      state: formState
    }),
    [formState]
  );

  return (
    <FormStateContext.Provider value={{ state, watch: (path: string): Field => get(state, path) as Field }}>
      <FormDispatchContext.Provider value={dispatch}>{children}</FormDispatchContext.Provider>
    </FormStateContext.Provider>
  );
};

FormContextProvider.propTypes = {
  children: PropTypes.element.isRequired
};

/**
 * @internal
 * This hook is used inside of our components to grab state and dispatch values
 *
 * @return Returns an object with state, watch and dispatch fields from our context
 */
export const useFormContext = (): FormStateContextValue & { dispatch: FormDispatchContextValue } => {
  const state = useContext(FormStateContext);
  const dispatch = useContext(FormDispatchContext);

  if (state === undefined || dispatch === undefined) {
    throw new Error('useForm must be used inside a Form.');
  }

  return { ...state, dispatch };
};

export default FormContextProvider;
