import React, { cloneElement, memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useForm, usePath, commonPropTypes, useCommonProps } from '../../context';
import { Field as FormField } from '../../context/form/FormContext';
import { useWatch } from '../../hooks';
import { createFieldPath } from '../../utils';
import { useFieldSetContext } from '../FieldSet/context';
import { FieldProps } from './Field';

const Field: React.FC<FieldProps> = memo(
  ({ children: input, name, watch, renderInput, getValue, setValue, nameSeparator, getters, index }) => {
    const path = usePath();
    const subscribe = useFieldSetContext();
    const { getState, dispatch } = useForm();
    const commonProps = useCommonProps({ getValue, setValue, nameSeparator, getters });

    const fieldPath = createFieldPath({ path, name, index, nameSeparator: commonProps.nameSeparator });
    const fieldState = getState(fieldPath) as FormField;

    const [inputValue, setInputValue] = useState<unknown>();
    const [newFieldState, setNewFieldState] = useState<FormField>(fieldState);

    useEffect(() => {
      dispatch({
        type: 'register',
        payload: {
          name,
          path: fieldPath,
          value: input.props?.[commonProps.getters.defaultValue]
        }
      });

      return (): void => dispatch({ type: 'unregister', payload: { fieldPath } });
    }, []);

    useEffect(() => {
      dispatch({ type: 'register', payload: { name, path: fieldPath, value: inputValue } });

      setNewFieldState({ ...fieldState, value: inputValue });

      if (subscribe) {
        subscribe();
      }
    }, [inputValue]);

    useWatch(newFieldState, watch);

    if (renderInput) {
      return renderInput({
        value: fieldState?.value,
        setValue: renderInputValue => setInputValue(renderInputValue)
      });
    }

    return cloneElement(input, {
      [commonProps.getters.value]: commonProps.setValue(fieldState?.value),
      [commonProps.getters.event]: ({ target: { value } }: { target: { value: unknown } }) =>
        setInputValue(commonProps.getValue(value))
    });
  }
);

Field.propTypes = {
  children: PropTypes.element.isRequired,
  index: PropTypes.number,
  ...commonPropTypes
};

Field.defaultProps = {
  getters: {
    value: 'value',
    defaultValue: 'defaultValue',
    event: 'onChange'
  }
};

export default Field;
