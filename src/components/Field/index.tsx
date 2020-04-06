import React, { cloneElement, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useForm } from '../../context/form';
import { Field as FormField } from '../../context/form/FormContext';
import { usePath } from '../../context/path';
import { useWatch } from '../../hooks';
import { FieldProps } from './Field';

const Field: React.FC<FieldProps> = ({
  children: input,
  name,
  watch,
  handleChange = (value: unknown): unknown => value,
  index,
  getters = {}
}) => {
  const { value = 'value', defaultValue = 'defaultValue', onChange = 'onChange' } = getters;

  const [inputValue, setInputValue] = useState<unknown>();

  const path = usePath();
  const { getState, dispatch, createFieldPath } = useForm();

  const fieldPath = createFieldPath({ path, name, index });
  const fieldState = getState(fieldPath) as FormField;

  useEffect(() => {
    dispatch({
      type: 'register',
      payload: {
        name,
        path: fieldPath,
        value: input.props?.[defaultValue]
      }
    });

    return (): void => dispatch({ type: 'unregister', payload: fieldPath });
  }, []);

  useEffect(() => {
    dispatch({ type: 'register', payload: { name, path: fieldPath, value: inputValue } });
  }, [inputValue]);

  useWatch({ ...fieldState, value: inputValue }, watch);

  return cloneElement(input, {
    [value]: fieldState?.value,
    [onChange]: (changeState?: unknown) => setInputValue(handleChange(changeState))
  });
};

Field.propTypes = {
  children: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  watch: PropTypes.func,
  index: PropTypes.number,
  getters: PropTypes.shape({
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.string
  })
};

Field.defaultProps = {
  getters: {
    value: 'value',
    defaultValue: 'defaultValue',
    onChange: 'onChange'
  }
};

export default Field;
