import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';

import { FormActionType } from './action';
import { Field, FormStateContextValue, FormDispatchContextValue, FormState, Input, ErrorState } from './FormContext';
import formReducer from './reducer';

export const FormStateContext = createContext({} as FormStateContextValue);
export const FormDispatchContext = createContext({} as FormDispatchContextValue);

const FormContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, {});

  const getState = (): FormState => state;

  const validate = (errorState: ErrorState): void => {
    dispatch({
      type: FormActionType.SetError,
      payload: errorState
    });
  };

  const watch = ({ path }: { path: string }): Field => {
    return get(state, path) as Field;
  };

  const register = ({ ...input }: Input): void => {
    dispatch({
      type: FormActionType.Register,
      payload: input
    });
  };

  const unregister = ({ path }: { path: string }): void => {
    dispatch({
      type: FormActionType.Ungerister,
      payload: { path }
    });
  };

  return (
    <FormStateContext.Provider value={{ getState, watch }}>
      <FormDispatchContext.Provider value={{ validate, register, unregister }}>{children}</FormDispatchContext.Provider>
    </FormStateContext.Provider>
  );
};

FormContextProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export const useFormState = (): FormStateContextValue => useContext(FormStateContext);

export const useFormDispatch = (): FormDispatchContextValue => useContext(FormDispatchContext);

export default FormContextProvider;
