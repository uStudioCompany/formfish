import { useEffect } from 'react';
import { FormMember } from '..';

export type Watch<T extends FormMember> = (state: T) => void;

/**
 * @internal
 * This hook is used to grab the state value of a form object property
 *
 * @return Returns an object with state of a member from our context
 */
const useWatch = <T extends FormMember>(state: T, watch?: Watch<T>): void => {
  useEffect(() => {
    if (watch) {
      watch(state);
    }
  }, [watch, state]);
};

export default useWatch;
