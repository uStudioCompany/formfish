import { ReactElement } from 'react';
import { ErrorState, FormState } from '../../context/form/FormContext';
import { Watch } from '../../hooks/use-watch';
import { CommonProps } from '../../types';

export interface FormProps extends CommonProps {
  /**
   * Form children can be anything with any depth of nesting, but should include either FieldSets of Fields inside
   */
  children: ReactElement | ReactElement[];
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
  watch?: Watch<FormState>;
  /**
   * For extension with styled-components or CSS classes
   */
  className?: string;
}
