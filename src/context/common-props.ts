import PropTypes, { InferProps } from 'prop-types';
import { createContext, useContext } from 'react';
import { CommonProps } from '../types';

type CommonPropsContextValue = Pick<CommonProps, 'getValue' | 'setValue' | 'getters' | 'nameSeparator'>;

const CommonPropsContext = createContext<CommonPropsContextValue | undefined>(undefined);

export const useCommonProps = (
  props: CommonPropsContextValue
): Required<CommonPropsContextValue> & { getters: Required<CommonPropsContextValue['getters']> } => {
  const commonProps = useContext(CommonPropsContext);

  if (commonProps === undefined) {
    throw new ReferenceError('useCommonProps must be used inside a Form.');
  }

  const {
    getValue = (value: unknown): unknown => value,
    setValue = (value: unknown): unknown => value,
    nameSeparator = ' ',
    getters = {}
  } = commonProps;
  const { value = 'value', defaultValue = 'defaultValue', event = 'onChange' } = getters;

  return {
    getValue: props?.getValue || getValue,
    setValue: props?.setValue || setValue,
    nameSeparator: props?.nameSeparator || nameSeparator,
    getters: {
      value: props?.getters?.value || value,
      defaultValue: props?.getters?.defaultValue || defaultValue,
      event: props?.getters?.event || event
    }
  };
};

export const commonPropTypes: InferProps<CommonProps> = {
  name: PropTypes.string.isRequired,
  watch: PropTypes.func,
  nameSeparator: PropTypes.string,
  getValue: PropTypes.func,
  setValue: PropTypes.func,
  getters: PropTypes.shape({
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    event: PropTypes.string
  })
};

export default CommonPropsContext;
