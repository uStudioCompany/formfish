import { useEffect } from 'react';

export type Watch<T> = (state: T) => void;

/**
 * @internal
 * This hook is used to grab the state value of a form object property
 *
 * @return Returns an object with state of a member from our context
 */
function useWatch<T>(state: T, watch?: Watch<T>): void {
  useEffect(() => {
    if (watch) {
      watch(state);
    }
  }, [watch, state]);
}

export default useWatch;
