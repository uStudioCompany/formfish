import React from 'react';
import PropTypes, { InferProps } from 'prop-types';

import PathContext, { usePath } from '../../context/path';
import { createFieldPath } from '../../utils';
import { FieldSetProps } from './FieldSet';
import Style from './style';

const FieldSet: React.FC<InferProps<FieldSetProps>> = ({
  children: fields,
  name,
  index,
  isDisabled = false,
  className = ''
}) => {
  const { path } = usePath();

  return (
    <Style.Wrapper disabled={isDisabled}>
      <Style.FieldSet className={className}>
        <legend>{name}</legend>

        <PathContext.Provider
          value={{
            path: createFieldPath({ path, name, index })
          }}
        >
          {fields}
        </PathContext.Provider>
      </Style.FieldSet>
    </Style.Wrapper>
  );
};

FieldSet.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]).isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number,
  isDisabled: PropTypes.bool,
  className: PropTypes.string
};

FieldSet.defaultProps = {
  isDisabled: false,
  className: ''
};

export default FieldSet;
