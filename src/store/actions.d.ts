export type FormAction = Register | Unregister;

interface Register {
  type: 'register';
  payload: {
    path: string;
    value: unknown;
  };
}

interface Unregister {
  type: 'unregister';
  payload: {
    fieldPath: string;
    parentPath: string;
  };
}
