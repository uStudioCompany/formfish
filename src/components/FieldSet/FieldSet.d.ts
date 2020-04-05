import { ReactElement } from 'react';

export interface FieldSetProps {
  children: ReactElement | ReactElement[];
  name: string;
  direction?: 'row' | 'column';
  index?: number;
  isDisabled?: boolean;
  className?: string;
}
