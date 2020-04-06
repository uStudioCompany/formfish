import React, { cloneElement, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useForm } from '../../context/form';
import { Field as FormField } from '../../context/form/FormContext';
import { usePath } from '../../context/path';
import { FieldProps } from './Field';

const Field: React.FC<FieldProps> = ({ children: input, name, watch, index, getters = {} }) => {
  const { value = 'value', defaultValue = 'defaultValue', onChange = 'onChange' } = getters;

  const path = usePath();
  const { getState, dispatch, createFieldPath } = useForm();

  const fieldPath = createFieldPath({ path, name, index });

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

  const fieldState = getState(fieldPath) as FormField;

  return cloneElement(input, {
    [value]: fieldState?.value,
    [onChange]: (inputValue?: unknown) => {
      if (watch) {
        watch({ ...fieldState, value: inputValue });
      }

      dispatch({ type: 'register', payload: { name, path: fieldPath, value: inputValue } });
    }
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
