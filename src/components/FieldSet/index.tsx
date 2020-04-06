import React from 'react';
import PropTypes, { InferProps } from 'prop-types';

import { useForm } from '../../context/form';
import PathContext, { usePath } from '../../context/path';
import { useWatch } from '../../hooks';
import { FieldSetProps } from './FieldSet';
import Style from './style';

const FieldSet: React.FC<InferProps<FieldSetProps>> = ({
  children: fields,
  name,
  watch,
  index,
  isDisabled = false,
  className = ''
}) => {
  const path = usePath();
  const { getState, createFieldPath } = useForm();

  const fieldSetPath = createFieldPath({ path, name, index });
  const fieldSetState = getState(fieldSetPath);

  useWatch(fieldSetState, watch);

  return (
    <Style.FieldSet disabled={isDisabled}>
      <div className={className}>
        <legend>{name}</legend>

        <PathContext.Provider value={fieldSetPath}>{fields}</PathContext.Provider>
      </div>
    </Style.FieldSet>
  );
};

FieldSet.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]).isRequired,
  name: PropTypes.string.isRequired,
  watch: PropTypes.func,
  index: PropTypes.number,
  isDisabled: PropTypes.bool,
  className: PropTypes.string
};

FieldSet.defaultProps = {
  isDisabled: false,
  className: ''
};

export default FieldSet;
