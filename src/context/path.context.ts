import { createContext, useContext, useMemo } from 'react';

const PathContext = createContext('');

export const usePath = (): string => {
  const pathFromContext = useContext(PathContext);

  return useMemo(() => pathFromContext, [pathFromContext]);
};

export default PathContext;
