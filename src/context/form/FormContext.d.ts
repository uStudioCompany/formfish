import { Schema } from 'yup';

export interface FormContextValue {
  getState(): FormState;
  validate(
    schema: Schema<{ [name: string]: {} }>
  ): Promise<void>;
  watch({ path }: Path): Field;
  register({ ...input }: Input): void;
  unregister({ path }: Path): void;
}

export interface Field {
  name: string;
  value: unknown | undefined;
  isDisabled: boolean;
  isRequired: boolean;
  error?: string;
}

export interface Path {
  path: string;
}

type FieldSet = {
  [name: string]: FormMember;
};

type FieldArray = FormMember[];

export type FormState = FieldSet;

export type FormMember = Field | FieldSet | FieldArray;

export interface Input<V extends unknown = unknown> {
  path: string;
  value: V;
  name: string;
  isDisabled?: boolean;
  isRequired?: boolean;
}
