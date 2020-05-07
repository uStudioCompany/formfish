import { useFormContext } from '../store';

/**
 * Public hook to use inside custom components in the Form.
 * Allows getting a state of any form member by its path.
 *
 * @return getState function from form context
 */
function useForm(path: string): unknown {
  const { getState } = useFormContext();

  return getState(path);
};

export default useForm;
