import { Dispatch } from 'react';
import { FormAction } from './actions';

export type FormDispatchContextValue = Dispatch<FormAction>;

export interface FormStateContextValue {
  state: FormState;
  getState(path: string): FormMember;
}

export interface Field {
  name: string;
  value: unknown | undefined;
  error?: string;
}

export type FieldSet = {
  [name: string]: FormMember;
};

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
