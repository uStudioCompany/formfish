import type { Dispatch } from 'react';

import type { FormProps } from '../components/Form';
import type { FormAction } from './actions';

export interface FormContextProviderProps {
  watch: FormProps['watch'];
  initialState?: FormState;
}

export type FormDispatchContextValue = Dispatch<FormAction>;

export interface FormStateContextValue {
  getState(path: string): unknown;
}

export type Field = Omit<unknown, FormFieldSet | FormFieldArray>;

export interface FormFieldSet {
  [name: string]: FormMember;
}

export type FormFieldArray = FormMember[];

export interface FormState {
  [name: string]: FormFieldSet;
}

export type FormMember = FormFieldSet | FormFieldArray | Field;
