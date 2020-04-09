import { useFormContext } from '../context/form';
import { FormStateContextValue } from '../context/form/FormContext';

/**
 * Public hook to use inside custom components in the Form.
 * Allows getting a state of any form member by its path.
 *
 * @return getState function from form context
 */
const useForm = (): FormStateContextValue['getState'] => {
  return useFormContext().getState;
};

export default useForm;
