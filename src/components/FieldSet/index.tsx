import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import CommonPropsContext from '../../context/common-props';
import { useForm, usePath, commonPropTypes, useCommonProps } from '../../context';
import PathContext from '../../context/path';
import { createFieldPath } from '../../utils';
import FieldSetContext from './context';
import { useWatch } from '../../hooks';
import { FieldSetProps } from './FieldSet';

const FieldSet: React.FC<FieldSetProps> = ({
  children: fields,
  name,
  watch,
  index,
  getValue,
  setValue,
  nameSeparator,
  getters,
  className = ''
}) => {
  const path = usePath();
  const { getState, dispatch } = useForm();
  const commonProps = useCommonProps({ getValue, setValue, nameSeparator, getters });

  const fieldSetPath = createFieldPath({ path, name, index, nameSeparator: commonProps.nameSeparator });
  const fieldSetState = getState(fieldSetPath);

  const [newFieldSetState, setNewFieldSetState] = useState(fieldSetState);

  const subscribe = (): void => {
    setNewFieldSetState(Array.isArray(fieldSetState) ? [...fieldSetState] : { ...fieldSetState });
  };

  useWatch(newFieldSetState, watch);

  useEffect(() => {
    return () => {
      dispatch({
        type: 'unregister',
        payload: {
          fieldPath: fieldSetPath
        }
      });
    };
  }, []);

  return (
    <div className={className}>
      <FieldSetContext.Provider value={subscribe}>
        <CommonPropsContext.Provider value={commonProps}>
          <PathContext.Provider value={fieldSetPath}>{fields}</PathContext.Provider>
        </CommonPropsContext.Provider>
      </FieldSetContext.Provider>
    </div>
  );
};

FieldSet.displayName = 'FieldSet';

FieldSet.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
    PropTypes.element.isRequired
  ]).isRequired,
  index: PropTypes.number,
  className: PropTypes.string,
  ...commonPropTypes
};

FieldSet.defaultProps = {
  className: ''
};

export default memo(FieldSet);
