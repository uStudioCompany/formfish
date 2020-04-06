import { Dispatch } from 'react';

import { FormProps } from '../../components/Form/Form';
import { FormAction } from './actions';

export interface FormContextProviderProps {
  watch: FormProps['watch'];
  nameSeparator: string;
}

export type FormDispatchContextValue = Dispatch<FormAction>;

export interface FormStateContextValue {
  createFieldPath: (args: { path: string; name: string; index?: number }) => string;
  getState(path: string): FormMember;
}

export interface Field {
  name: string;
  value: unknown | undefined;
  error?: string;
}

export interface FieldSet {
  [name: string]: FormMember;
}

export type FieldArray = FormMember[];

export type FormState = FieldSet;

export type FormMember = Field | FieldSet | FieldArray;

export interface Input<V = unknown, P = {}> extends P {
  path: string;
  value: V;
  name: string;
}

export interface ErrorState {
  [name: string]: ErrorState | string;
}
