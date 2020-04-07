import React, { FormEvent } from 'react';
import PropTypes from 'prop-types';

import FormContextProvider, { FormDispatchContext, FormStateContext } from '../../context/form';
import { FormDispatchContextValue, FormState, FormStateContextValue } from '../../context/form/FormContext';
import PathContext from '../../context/path';
import CommonPropsContext, { commonPropTypes } from '../../context/common-props';
import { createFieldName } from '../../utils';
import flattenState from '../../utils/flatten-state';
import { FormProps } from './Form';

const Form: React.FC<FormProps> = ({
  children: form,
  name,
  onSubmit,
  onValidate,
  watch,
  getValue,
  setValue,
  getters,
  nameSeparator = ' ',
  className = ''
}) => {
  const handleValidate = (state: FormState, dispatch: FormDispatchContextValue): void => {
    try {
      if (onValidate) {
        onValidate(state);
      }

      onSubmit(flattenState(state), state);
    } catch (errorState) {
      dispatch({
        type: 'set_error',
        payload: errorState
      });
    }
  };

  const handleSubmit = (state: FormState, dispatch: FormDispatchContextValue) => (
    event: FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();

    handleValidate(state, dispatch);
  };

  return (
    <FormContextProvider watch={watch}>
      <FormStateContext.Consumer>
        {({ getState }: FormStateContextValue) => (
          <FormDispatchContext.Consumer>
            {(dispatch: FormDispatchContextValue) => (
              <form
                id={name}
                className={className}
                onSubmit={handleSubmit({ [name]: getState(name) } as FormState, dispatch)}
              >
                <CommonPropsContext.Provider value={{ getValue, setValue, nameSeparator, getters }}>
                  <PathContext.Provider value={createFieldName(name, nameSeparator)}>{form}</PathContext.Provider>
                </CommonPropsContext.Provider>
              </form>
            )}
          </FormDispatchContext.Consumer>
        )}
      </FormStateContext.Consumer>
    </FormContextProvider>
  );
};

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
    PropTypes.element.isRequired
  ]).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onValidate: PropTypes.func,
  className: PropTypes.string,
  ...commonPropTypes
};

Form.defaultProps = {
  className: ''
};

export default Form;
