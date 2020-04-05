import { useFormContext } from '../context/form';
import { FormStateContextValue } from '../context/form/FormContext';

/**
 * This hook is used to grab the state value and watch method
 *
 * @return Returns an object with state and watch fields from our context
 */
const useForm = (): FormStateContextValue => {
  const { state, watch } = useFormContext();

  return { state, watch };
};

export default useForm;
