import { ReactElement } from 'react';
import { Field } from '../../context/form/FormContext';
import { Watch } from '../../hooks/use-watch';
import { CommonProps } from '../../types';

export interface FieldProps extends CommonProps {
  children?: ReactElement;
  /**
   * Index to be accepted when used inside of an array
   */
  index?: number;
  watch?: Watch<Field>;
  /**
   * Alternative approach to render input inside the Field
   */
  renderInput?({ value, setValue }: { value: unknown; setValue: (value: unknown) => void }): ReactElement;
}
