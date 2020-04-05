import React, { cloneElement, useContext, useEffect } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { FormContext } from '../../context/form';
import { PathContext } from '../../context/path';
import { createFieldPath } from '../../utils';
import { FieldProps } from './Field';

const Field: React.FC<InferProps<FieldProps>> = ({
  children: input,
  name,
  index,
  isDisabled = false,
  isRequired = false
}) => {
  const { path } = useContext(PathContext);
  const { register, unregister, watch } = useContext(FormContext);

  const fieldPath = createFieldPath({ path, name, index });

  useEffect(() => {
    register({
      path: fieldPath,
      value: input.props.defaultValue,
      name,
      isDisabled,
      isRequired
    });

    return () => unregister({ path: fieldPath });
  }, []);

  return cloneElement(input, {
    value: watch({ path: fieldPath })?.value,
    onChange: (value?: unknown) =>
      register({ path: fieldPath, value, name, isDisabled, isRequired })
  });
};

Field.propTypes = {
  children: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool
};

Field.defaultProps = {
  isDisabled: false,
  isRequired: false
};

export default Field;
