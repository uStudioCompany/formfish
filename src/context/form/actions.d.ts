import { ErrorState, Input } from './FormContext';

export type FormAction = Register | Unregister | SetError;

interface Register {
  type: 'register';
  payload: Input;
}

interface Unregister {
  type: 'unregister';
  payload: {
    fieldPath: string;
    parentPath: string;
  };
}

interface SetError {
  type: 'set_error';
  payload: ErrorState;
}
