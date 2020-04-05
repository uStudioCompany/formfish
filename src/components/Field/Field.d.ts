import { ReactElement } from 'react';

export interface FieldProps {
  children: ReactElement;
  name: string;
  index?: number;
  isDisabled?: boolean;
  isRequired?: boolean;
}
