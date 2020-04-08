import { Input } from './FormContext';

export type FormAction = Register | Unregister;

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
