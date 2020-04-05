import { ReactElement } from 'react';
import { Schema } from 'yup';
import { FormMember, FormState } from '../../context/form/FormContext';

export interface FormProps {
  children: ReactElement | ReactElement[];
  name: string;
  onSubmit(state: FormState): void;
  schema?: Schema<{ [name: string]: FormMember | { value: unknown } }>;
  className?: string;
}
