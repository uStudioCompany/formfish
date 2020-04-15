import { Dispatch } from 'react';

import { FormProps } from '../../components/Form/Form';
import { FormAction } from './actions';

export interface FormContextProviderProps {
  watch: FormProps['watch'];
  initialState?: FormState;
}

export type FormDispatchContextValue = Dispatch<FormAction>;

export interface FormStateContextValue {
  getState(path: string): FormMember;
}

export interface Field {
  name?: string;
  value: unknown | undefined;
}

export interface FieldSet {
  [name: string]: FormMember;
}

export type FieldArray = FormMember[];

export type FormState = FieldSet;

export type FormMember = Field | FieldSet | FieldArray;

export interface Input {
  path: string;
  value: unknown;
  name: string;
}
