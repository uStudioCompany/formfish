import React, { cloneElement, ReactElement, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { usePath, commonPropTypes, useCommonProps } from '../../context';
import { useFormContext } from '../../store';

import { useWatch } from '../../hooks';
import { createFieldPath } from '../../utils';
import { useFieldSetContext } from '../FieldSet/field-set.context';
import type { FieldProps } from './field.types';

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
  const path = usePath(name);
  const subscribe = useFieldSetContext();
  const { getState, dispatch } = useFormContext();
  const commonProps = useCommonProps({ getValue, setValue, nameSeparator, getters });

  const fieldPath = useMemo(() => createFieldPath({ path, name, index, nameSeparator: commonProps.nameSeparator }), [
    path,
    name,
    index,
    commonProps.nameSeparator
  ]);
  const fieldState = getState(fieldPath);

  const [isMounted, setMounted] = useState(false);

  const [renderedInput, setRenderedInput] = useState<ReactElement | undefined>(undefined);
  const [inputValue, setInputValue] = useState<unknown>(
    commonProps.setValue(fieldState ?? input?.props?.[commonProps.getters.defaultValue])
  );

  useEffect(() => {
    if (renderedInput) {
      setInputValue(fieldState ?? renderedInput?.props?.[commonProps.getters.defaultValue]);
    }
  }, [renderedInput]);

  useEffect(() => {
    if (input || renderedInput) {
      setMounted(true);
    }

    if ((input || renderedInput) && isMounted) {
      dispatch({ type: 'register', payload: { path: fieldPath, value: inputValue } });
    }

    return (): void => {
      setMounted(false);
    };
  }, [input, isMounted, inputValue]);

  useEffect(() => {
    if (isMounted && subscribe) {
      subscribe();
    }
  }, [isMounted, subscribe, inputValue]);

  useEffect(() => {
    return (): void => {
      dispatch({ type: 'unregister', payload: { fieldPath, parentPath: path } });
    };
  }, []);

  useWatch(inputValue, watch);

  if (renderInput) {
    const prerenderedInput = renderInput({
      value: inputValue,
      setValue: (value) => setInputValue(value)
    });

    if (!renderedInput) {
      setRenderedInput(prerenderedInput);
    }

    return prerenderedInput;
  }

  return cloneElement(input as ReactElement, {
    [commonProps.getters.value]: commonProps.setValue(inputValue),
    [commonProps.getters.event]: (value: unknown) => setInputValue(commonProps.getValue(value)),
    [commonProps.getters.id]: name
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
