import { useFormContext } from '../store';
import type { FormStateContextValue } from '../store/store.types';

/**
 * Public hook to use inside custom components in the Form.
 * Allows getting a state of any form member by its path.
 *
 * @return getState function from form context
 */
const useForm = (): FormStateContextValue['getState'] => {
  const { getState } = useFormContext();

  return getState;
};

export default useForm;
