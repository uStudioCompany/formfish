import { createContext, useContext, useMemo } from 'react';

const SeparatorContext = createContext<string>(' ');

export const useSeparator = (): string => {
  const separator = useContext(SeparatorContext);

  return useMemo(() => separator, [separator]);
};

export default SeparatorContext;
