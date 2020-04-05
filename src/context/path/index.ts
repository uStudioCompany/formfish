import { createContext, useContext } from 'react';

interface PathContextValue {
  path: string;
}

const PathContext = createContext({} as PathContextValue);

export const usePath = (): PathContextValue => useContext(PathContext);

export default PathContext;
