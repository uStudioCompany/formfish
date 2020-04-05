import React, { cloneElement, useEffect } from 'react';
import PropTypes, { InferProps } from 'prop-types';

import { useFormContext } from '../../context/form';
import { usePath } from '../../context/path';
import { createFieldPath } from '../../utils';
import { FieldProps } from './Field';

const Field: React.FC<InferProps<FieldProps>> = ({ children: input, name, index, getters }) => {
  const { value = 'value', defaultValue = 'defaultValue', onChange = 'onChange' } = getters;

  const path = usePath();
  const { watch, dispatch } = useFormContext();

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

  return cloneElement(input, {
    [value]: watch(fieldPath)?.value,
    [onChange]: (inputValue?: unknown) =>
      dispatch({ type: 'register', payload: { name, path: fieldPath, value: inputValue } })
  });
};

Field.propTypes = {
  children: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
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
