import React from 'react';
import PropTypes from 'prop-types';

import { useForm } from '../../context/form';
import PathContext, { usePath } from '../../context/path';
import { useWatch } from '../../hooks';
import { FieldSetProps } from './FieldSet';

const FieldSet: React.FC<FieldSetProps> = ({ children: fields, name, watch, index, className = '' }) => {
  const path = usePath();
  const { getState, createFieldPath } = useForm();

  const fieldSetPath = createFieldPath({ path, name, index });

  useWatch(getState(fieldSetPath), watch);

  return (
    <div className={className}>
      <PathContext.Provider value={fieldSetPath}>{fields}</PathContext.Provider>
    </div>
  );
};

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
