import React, { cloneElement, useEffect } from 'react';
import PropTypes, { InferProps } from 'prop-types';

import { useFormDispatch, useFormState } from '../../context/form';
import { usePath } from '../../context/path';
import { createFieldPath } from '../../utils';
import { FieldProps } from './Field';

const Field: React.FC<InferProps<FieldProps>> = ({ children: input, name, index }) => {
  const { path } = usePath();
  const { watch } = useFormState();
  const { register, unregister } = useFormDispatch();

  const fieldPath = createFieldPath({ path, name, index });

  useEffect(() => {
    register({
      name,
      path: fieldPath,
      value: input.props?.defaultValue
    });

    return (): void => unregister({ path: fieldPath });
  }, []);

  return cloneElement(input, {
    value: watch({ path: fieldPath })?.value,
    onChange: (value?: unknown) => register({ path: fieldPath, value, name, ...input.props })
  });
};

Field.propTypes = {
  children: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number
};

export default Field;
