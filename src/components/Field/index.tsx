import React, { cloneElement, ReactElement, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useFormContext, usePath, commonPropTypes, useCommonProps } from '../../context';
import { Field as FormField } from '../../context/form/FormContext';
import { useWatch } from '../../hooks';
import { createFieldPath } from '../../utils';
import { useFieldSetContext } from '../FieldSet/context';
import { FieldProps } from './Field';

const Field: React.FC<FieldProps> = ({
  children: input,
  name,
  watch,
  renderInput,
  getValue,
  setValue,
  nameSeparator,
  getters,
  index
}) => {
  const path = usePath();
  const subscribe = useFieldSetContext();
  const { getState, dispatch } = useFormContext();
  const commonProps = useCommonProps({ getValue, setValue, nameSeparator, getters });

  const fieldPath = createFieldPath({ path, name, index, nameSeparator: commonProps.nameSeparator });
  const fieldState = getState(fieldPath) as FormField;

  const [isMounted, setMounted] = useState(false);

  const [inputValue, setInputValue] = useState<unknown>();
  const [newFieldState, setNewFieldState] = useState<FormField>(fieldState);

  useEffect(() => {
    if (input) {
      setMounted(true);
    }

    if (isMounted) {
      dispatch({
        type: 'register',
        payload: {
          name,
          path: fieldPath,
          value: (input as ReactElement).props?.[commonProps.getters.defaultValue]
        }
      });
    }

    return (): void => {
      setMounted(false);
      dispatch({ type: 'unregister', payload: { fieldPath } });
    };
  }, [input, isMounted]);

  useEffect(() => {
    dispatch({ type: 'register', payload: { name, path: fieldPath, value: inputValue } });

    setNewFieldState({ ...fieldState, value: inputValue });

    if (subscribe) {
      subscribe();
    }
  }, [inputValue]);

  useWatch(newFieldState, watch);

  if (renderInput) {
    return renderInput({
      value: fieldState?.value,
      setValue: renderInputValue => setInputValue(renderInputValue)
    });
  }

  return cloneElement(input as ReactElement, {
    [commonProps.getters.value]: commonProps.setValue(fieldState?.value),
    [commonProps.getters.event]: (value: unknown) => setInputValue(commonProps.getValue(value))
  });
};

Field.displayName = 'Field';

Field.propTypes = {
  children: PropTypes.element,
  index: PropTypes.number,
  renderInput: PropTypes.func,
  ...commonPropTypes
};

Field.defaultProps = {
  getters: {
    value: 'value',
    defaultValue: 'defaultValue',
    event: 'onChange'
  }
};

export default Field;
