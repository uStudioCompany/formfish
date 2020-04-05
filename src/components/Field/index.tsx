import React, { cloneElement, useEffect } from 'react';
import PropTypes, { InferProps } from 'prop-types';

import { useFormContext } from '../../context/form';
import { Field } from '../../context/form/FormContext';
import { usePath } from '../../context/path';
import { createFieldPath } from '../../utils';
import { FieldProps } from './Field';

const Field: React.FC<InferProps<FieldProps>> = ({ children: input, name, watch, index, getters }) => {
  const { value = 'value', defaultValue = 'defaultValue', onChange = 'onChange' } = getters;

  const path = usePath();
  const { getState, dispatch } = useFormContext();

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

  const fieldState = getState(fieldPath) as Field;

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