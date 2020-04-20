import { Dispatch } from 'react';

import { FormProps } from '../components/Form/Form.types';
import { FormAction } from './actions';

export interface FormContextProviderProps {
  watch: FormProps['watch'];
  initialState?: FormState;
}

export type FormDispatchContextValue = Dispatch<FormAction>;

export interface FormStateContextValue {
  getState<M extends FormMember = FormMember>(path: string): M;
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
