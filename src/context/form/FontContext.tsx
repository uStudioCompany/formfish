import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { Schema } from 'yup';
import { getErrorsState } from '../../utils';
import { FormActionType } from './action';
import { Field, FormContextValue, FormState, Input } from './FormContext';
import { formReducer } from './reducer';
import get from 'lodash.get';

export const FormContext = createContext({} as FormContextValue);

const FormContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, {});

  function getState() {
    return state;
  }

  async function validate(schema: Schema<FormState>) {
    await schema
      .validate(state, { abortEarly: false })
      .catch(validationError => {
        dispatch({
          type: FormActionType.SetError,
          payload: getErrorsState(validationError.inner)
        });
      });
  }

  function watch({ path }: { path: string }) {
    return get(state, path) as Field;
  }

  function register({ ...input }: Input) {
    dispatch({
      type: FormActionType.Register,
      payload: input
    });
  }

  function unregister({ path }: { path: string }) {
    dispatch({
      type: FormActionType.Ungerister,
      payload: { path }
    });
  }

  return (
    <FormContext.Provider
      value={{ getState, validate, watch, register, unregister }}
    >
      {children}
    </FormContext.Provider>
  );
};

FormContextProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default FormContextProvider;
