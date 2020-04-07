import { createContext, useContext } from 'react';

type FieldSetContextValue = () => void;

const FieldSetContext = createContext<FieldSetContextValue | undefined>(undefined);

export const useFieldSetContext = (): FieldSetContextValue => {
  const subscribe = useContext(FieldSetContext);

  if (subscribe === undefined) {
    throw new ReferenceError('useFieldSetContext must be used inside a FieldSet.');
  }

  return subscribe;
};

export default FieldSetContext;
