import { ReactElement } from 'react';
import { ErrorState, FormState } from '../../context/form/FormContext';
import { Watch } from '../../hooks/use-watch';

export interface FormProps {
  /**
   * Form children can be anything with any depth of nesting, but should include either FieldSets of Fields inside
   */
  children: ReactElement | ReactElement[];
  /**
   * Name of the Form
   */
  name: string;
  /**
   * Callback invoked after submitting the Form
   */
  onSubmit(state: FormState): void;
  /**
   * Optional callback invoked before onSubmit
   * Called with the Form state it should validate it and throw an error with proper interface
   * After throwing it dispatches an action that supplies ErrorState to the reducer
   */
  onValidate?(state: FormState): ErrorState;
  /**
   * A method to access Form state at any time
   */
  watch?: Watch<FormState>;
  /**
   * Custom separator for createFieldName function
   */
  nameSeparator?: string;
  /**
   * For extension with styled-components or CSS classes
   */
  className?: string;
}
