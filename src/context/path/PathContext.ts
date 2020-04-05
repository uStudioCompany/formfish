import { createContext } from 'react';

const PathContext = createContext({} as PathContextValue);

interface PathContextValue {
  path: string;
}

export default PathContext;
