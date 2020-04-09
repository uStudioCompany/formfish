import React, { createContext, PropsWithChildren, useContext, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';

import { useWatch } from '../../hooks';
import {
  FormStateContextValue,
  FormDispatchContextValue,
  FormState,
  FormMember,
  FormContextProviderProps
} from './FormContext';
import formReducer from './reducer';

export const FormStateContext = createContext<FormStateContextValue | undefined>(undefined);
export const FormDispatchContext = createContext<FormDispatchContextValue | undefined>(undefined);

const FormContextProvider: React.FC<PropsWithChildren<FormContextProviderProps>> = ({ children, watch }) => {
  const [formState, dispatch] = useReducer(formReducer, {});

  const state = useMemo<FormState>(() => formState, [formState]);

  useWatch(state, watch);

  return (
    <FormStateContext.Provider
      value={{
        getState: (path: string): FormMember => get(state, path) as FormMember
      }}
    >
      <FormDispatchContext.Provider value={dispatch}>{children}</FormDispatchContext.Provider>
    </FormStateContext.Provider>
  );
};

FormContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
  watch: PropTypes.func
};

/**
 * @internal
 * This hook is used inside of our components to grab state and dispatch values
 *
 * @return Returns an object with state, watch and dispatch fields from our context
 */
export const useFormContext = (): FormStateContextValue & { dispatch: FormDispatchContextValue } => {
  const stateContext = useContext(FormStateContext);
  const dispatch = useContext(FormDispatchContext);

  if (stateContext === undefined || dispatch === undefined) {
    throw new ReferenceError('useFormContext must be used inside a Form.');
  }

  return { ...stateContext, dispatch };
};

export default FormContextProvider;
