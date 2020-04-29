import { createContext, useContext, useMemo } from 'react';

const PathContext = createContext('');

export const usePath = (name: string): string => {
  const pathFromContext = useContext(PathContext);

  return useMemo(() => pathFromContext, [name]);
};

export default PathContext;
