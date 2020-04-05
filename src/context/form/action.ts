import { ErrorState, Input } from './FormContext';

export enum FormActionType {
  Register = 'register',
  Ungerister = 'unregister',
  SetError = 'set_error'
}

export type FormAction = Register | Unregister | SetError;

interface Register {
  type: FormActionType.Register;
  payload: Input;
}

interface Unregister {
  type: FormActionType.Ungerister;
  payload: { path: string };
}

interface SetError {
  type: FormActionType.SetError;
  payload: ErrorState;
}
