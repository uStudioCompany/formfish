import { ReactElement } from 'react';
import { ErrorState, FormState } from '../../context/form/FormContext';

export interface FormProps {
  children: ReactElement | ReactElement[];
  name: string;
  onSubmit(state: FormState): void;
  onValidate(state: FormState): ErrorState;
  className?: string;
}
