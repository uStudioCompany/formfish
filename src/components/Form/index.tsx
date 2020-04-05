import React, { FormEvent } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import FormContextProvider, { FormDispatchContext, FormStateContext } from '../../context/form';
import { FormDispatchContextValue, FormState, FormStateContextValue } from '../../context/form/FormContext';
import PathContext from '../../context/path';
import { createFieldName } from '../../utils';
import { FormProps } from './Form';

import Styled from './style';

const Form: React.FC<InferProps<FormProps>> = ({ children: form, name, onSubmit, onValidate, className = '' }) => {
  const handleValidate = (state: FormState, dispatch: FormDispatchContextValue): void => {
    if (onValidate) {
      try {
        onValidate(state);
      } catch (errorState) {
        dispatch({
          type: 'set_error',
          payload: errorState
        });
      }
    }
  };

  const handleSubmit = (state: FormState, dispatch: FormDispatchContextValue) => (
    event: FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();

    handleValidate(state, dispatch);

    onSubmit(state);
  };

  return (
    <FormContextProvider>
      <FormStateContext.Consumer>
        {({ state }: FormStateContextValue) => (
          <FormDispatchContext.Consumer>
            {(dispatch: FormDispatchContextValue) => (
              <Styled.Form id={name} className={className} onSubmit={handleSubmit(state, dispatch)}>
                <PathContext.Provider value={createFieldName(name)}>{form}</PathContext.Provider>
              </Styled.Form>
            )}
          </FormDispatchContext.Consumer>
        )}
      </FormStateContext.Consumer>
    </FormContextProvider>
  );
};

Form.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]).isRequired,
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onValidate: PropTypes.func,
  className: PropTypes.string
};

Form.defaultProps = {
  className: ''
};

export default Form;
