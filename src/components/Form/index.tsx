import React, { FormEvent } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import FormContextProvider, { FormDispatchContext, FormStateContext } from '../../context/form';
import { ErrorState, FormState } from '../../context/form/FormContext';
import PathContext from '../../context/path';
import { createFieldName } from '../../utils';
import { FormProps } from './Form';

import Styled from './style';

const Form: React.FC<InferProps<FormProps>> = ({ children: form, name, onSubmit, onValidate, className = '' }) => {
  const handleValidate = (state: FormState, validate: (errorState: ErrorState) => void): void => {
    if (onValidate) {
      try {
        onValidate(state);
      } catch (errorState) {
        validate(errorState);
      }
    }
  };

  const handleSubmit = (
    state: FormState,
    validate: (errorState: ErrorState) => void
  ): ((event: FormEvent<HTMLFormElement>) => void) => (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    handleValidate(state, validate);

    onSubmit(state);
  };

  return (
    <FormContextProvider>
      <FormStateContext.Consumer>
        {({ getState }) => (
          <FormDispatchContext.Consumer>
            {({ validate }) => (
              <Styled.Form id={name} className={className} onSubmit={handleSubmit(getState(), validate)}>
                <PathContext.Provider
                  value={{
                    path: createFieldName(name)
                  }}
                >
                  {form}
                </PathContext.Provider>
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
