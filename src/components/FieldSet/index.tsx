import React, { useContext } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { PathContext } from '../../context/path';
import { createFieldPath } from '../../utils';
import { FieldSetProps } from './FieldSet';
import Styled from './styled';

const FieldSet: React.FC<InferProps<FieldSetProps>> = ({
  children: fields,
  name,
  index,
  direction = 'row',
  isDisabled = false,
  className = ''
}) => {
  const { path } = useContext(PathContext);

  return (
    <Styled.Wrapper disabled={isDisabled}>
      <Styled.FieldSet dataDirection={direction} className={className}>
        <legend>{name}</legend>

        <PathContext.Provider
          value={{
            path: createFieldPath({ path, name, index })
          }}
        >
          {fields}
        </PathContext.Provider>
      </Styled.FieldSet>
    </Styled.Wrapper>
  );
};

FieldSet.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number,
  direction: PropTypes.oneOf(['row', 'column']),
  isDisabled: PropTypes.bool,
  className: PropTypes.string
};

FieldSet.defaultProps = {
  direction: 'row',
  isDisabled: false,
  className: ''
};

export default FieldSet;
