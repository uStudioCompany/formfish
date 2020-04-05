export interface FormDispatchContextValue {
  validate(errorState: ErrorState): void;
  register({ ...input }: Input): void;
  unregister({ path }: Path): void;
}

export interface FormStateContextValue {
  getState(): FormState;
  watch({ path }: Path): Field;
}

export interface Field {
  name: string;
  value: unknown | undefined;
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

export interface Input<V extends unknown = unknown, P extends {} = {}> extends P {
  path: string;
  value: V;
  name: string;
}

export interface ErrorState {
  [name: string]: ErrorState | string;
}
