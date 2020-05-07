import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import CommonPropsContext from '../../context/common-props.context';
import PathContext from '../../context/path.context';
import FieldSetContext from './field-set.context';

import { usePath, commonPropTypes, useCommonProps } from '../../context';
import { createFieldPath } from '../../utils';
import { useWatch } from '../../hooks';
import { useFormContext } from '../../store';

import type { FormFieldSet, FormFieldArray } from '../..';
import type { FieldSetProps } from './field-set.types';

const FieldSet: React.FC<FieldSetProps> = ({
  children,
  name,
  watch,
  index,
  getValue,
  setValue,
  nameSeparator,
  getters
}) => {
  const path = usePath(name);
  const { getState, dispatch } = useFormContext();
  const commonProps = useCommonProps({ getValue, setValue, nameSeparator, getters });

  const fieldSetPath = useMemo(() => createFieldPath({ path, name, index, nameSeparator: commonProps.nameSeparator }), [
    path,
    name,
    index,
    commonProps.nameSeparator
  ]);
  const fieldSetState = getState(fieldSetPath) as FormFieldSet | FormFieldArray;

  const [newFieldSetState, setNewFieldSetState] = useState(fieldSetState);

  const subscribe = useCallback((): void => {
    setNewFieldSetState((prevFieldSetState: FormFieldSet | FormFieldArray) => {
      if (JSON.stringify(prevFieldSetState) !== JSON.stringify(fieldSetState)) {
        return Array.isArray(fieldSetState) ? [...fieldSetState] : { ...fieldSetState };
      }

      return prevFieldSetState;
    });
  }, [fieldSetState]);

  useWatch(newFieldSetState, watch);

  useEffect(() => {
    return (): void => {
      dispatch({
        type: 'unregister',
        payload: {
          parentPath: path,
          fieldPath: fieldSetPath
        }
      });
    };
  }, []);

  return (
    <CommonPropsContext.Provider value={commonProps}>
      <FieldSetContext.Provider value={subscribe}>
        <PathContext.Provider value={fieldSetPath}>{children}</PathContext.Provider>
      </FieldSetContext.Provider>
    </CommonPropsContext.Provider>
  );
};

FieldSet.displayName = 'FieldSet';

FieldSet.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
    PropTypes.element.isRequired
  ]).isRequired,
  index: PropTypes.number,
  ...commonPropTypes
};

FieldSet.defaultProps = {
  index: undefined
};

export default FieldSet;
