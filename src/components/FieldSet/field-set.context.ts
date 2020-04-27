import { createContext, useContext } from 'react';

type FieldSetContextValue = () => void;

const FieldSetContext = createContext<FieldSetContextValue | undefined>(undefined);

export const useFieldSetContext = (): FieldSetContextValue | undefined => {
  return useContext(FieldSetContext);
};

export default FieldSetContext;
