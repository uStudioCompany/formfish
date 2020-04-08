import React, { FormEvent } from 'react';
import PropTypes from 'prop-types';

import FormContextProvider, { FormStateContext } from '../../context/form';
import { FieldSet, FormState, FormStateContextValue } from '../../context/form/FormContext';
import PathContext from '../../context/path';
import CommonPropsContext, { commonPropTypes } from '../../context/common-props';
import { cleanState, createFieldName, flattenState } from '../../utils';
import { FlatState } from '../../utils/flatten-state';
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
  const handleValidate = (flatState: FlatState, state: FormState): boolean => {
    if (onValidate) {
      try {
        onValidate(flatState, state);
      } catch (_) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (state: FormState) => (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const flatState = flattenState(cleanState(state) as FieldSet);

    if (handleValidate(flatState, state)) {
      onSubmit(flatState, state);
    }
  };

  return (
    <FormContextProvider watch={watch}>
      <FormStateContext.Consumer>
        {({ getState }: FormStateContextValue) => (
          <form id={name} className={className} onSubmit={handleSubmit({ [name]: getState(name) } as FormState)}>
            <CommonPropsContext.Provider value={{ getValue, setValue, nameSeparator, getters }}>
              <PathContext.Provider value={createFieldName(name, nameSeparator)}>{form}</PathContext.Provider>
            </CommonPropsContext.Provider>
          </form>
        )}
      </FormStateContext.Consumer>
    </FormContextProvider>
  );
};

Form.displayName = 'Form';

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
