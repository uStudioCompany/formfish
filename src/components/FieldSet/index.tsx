import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';

import { useForm } from '../../context/form';
import PathContext, { usePath } from '../../context/path';
import FieldSetContext from './context';
import { useWatch } from '../../hooks';
import { FieldSetProps } from './FieldSet';

const FieldSet: React.FC<FieldSetProps> = memo(({ children: fields, name, watch, index, className = '' }) => {
  const path = usePath();
  const { getState, createFieldPath } = useForm();

  const fieldSetPath = createFieldPath({ path, name, index });
  const fieldSetState = getState(fieldSetPath);

  const [newFieldSetState, setNewFieldSetState] = useState(fieldSetState);

  const subscribe = (): void => {
    setNewFieldSetState(Array.isArray(fieldSetState) ? [...fieldSetState] : { ...fieldSetState });
  };

  useWatch(newFieldSetState, watch);

  return (
    <div className={className}>
      <FieldSetContext.Provider value={{ subscribe }}>
        <PathContext.Provider value={fieldSetPath}>{fields}</PathContext.Provider>
      </FieldSetContext.Provider>
    </div>
  );
});

FieldSet.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
    PropTypes.element.isRequired
  ]).isRequired,
  name: PropTypes.string.isRequired,
  watch: PropTypes.func,
  index: PropTypes.number,
  className: PropTypes.string
};

FieldSet.defaultProps = {
  className: ''
};

export default FieldSet;
