import React, { cloneElement, ReactElement, useEffect, useMemo, useState } from 'react';
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

  const [renderedInput, setRenderedInput] = useState<ReactElement | undefined>(undefined);
  const [inputValue, setInputValue] = useState<unknown>(
    fieldState?.value || input?.props?.[commonProps.getters.defaultValue]
  );
  const [newFieldState, setNewFieldState] = useState<FormField>(fieldState);

  useEffect(() => {
    if (renderedInput) {
      setInputValue(fieldState?.value || renderedInput?.props?.[commonProps.getters.defaultValue]);
    }
  }, [renderedInput]);

  useEffect(() => {
    if (input || renderedInput) {
      setMounted(true);
      setNewFieldState(fieldState);
    }

    if ((input || renderedInput) && isMounted) {
      dispatch({
        type: 'register',
        payload: {
          name,
          path: fieldPath,
          value: inputValue
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

    if (fieldState?.value !== inputValue) {
      setNewFieldState({ ...fieldState, value: inputValue });
    }

    if (subscribe) {
      subscribe();
    }
  }, [inputValue]);

  useWatch(newFieldState, watch);

  if (renderInput) {
    const prerenderedInput = renderInput({
      value: inputValue,
      setValue: value => setInputValue(value)
    });

    if (!renderedInput) {
      setRenderedInput(prerenderedInput);
    }

    return prerenderedInput;
  }

  return cloneElement(input as ReactElement, {
    [commonProps.getters.value]: commonProps.setValue(inputValue),
    [commonProps.getters.event]: (value: unknown) => setInputValue(commonProps.getValue(value)),
    [commonProps.getters.id]: fieldState?.name
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
