import React, { FormEvent, ReactElement } from 'react';
import PropTypes from 'prop-types';

import FormContextProvider, { FormStateContext } from '../../store';
import type { FormState, FormStateContextValue } from '../../store/store.types';
import PathContext from '../../context/path.context';
import CommonPropsContext, { commonPropTypes } from '../../context/common-props.context';

import { createFieldName } from '../../utils';
import { cleanState } from './form.module';

import type { FormProps } from './form.types';

const Form: React.FC<FormProps> = ({
  children: form,
  name,
  onSubmit,
  onValidate,
  watch,
  initialState,
  getValue,
  setValue,
  getters,
  nameSeparator = ' ',
  className = ''
}) => {
  const handleValidate = (state: FormState): boolean => {
    if (onValidate) {
      try {
        onValidate(state);
      } catch (_) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (state: FormState) => (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const cleanedState = cleanState(state) as FormState;

    if (handleValidate(cleanedState)) {
      onSubmit(cleanedState);
    }
  };

  return (
    <PathContext.Provider value={createFieldName(name, nameSeparator)}>
      <CommonPropsContext.Provider value={{ getValue, setValue, nameSeparator, getters }}>
        <FormContextProvider watch={watch} initialState={initialState}>
          <FormStateContext.Consumer>
            {({ getState }: FormStateContextValue): ReactElement => (
              <form id={name} className={className} onSubmit={handleSubmit({ [name]: getState(name) } as FormState)}>
                {form}
              </form>
            )}
          </FormStateContext.Consumer>
        </FormContextProvider>
      </CommonPropsContext.Provider>
    </PathContext.Provider>
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
  className: '',
  onValidate: undefined
};

export default Form;
