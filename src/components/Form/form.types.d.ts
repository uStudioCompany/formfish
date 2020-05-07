import type { ReactElement } from 'react';
import type { Watch } from '../../hooks/use-watch';
import type { FormState } from '../..';
import type { CommonProps } from '../../types';

export interface FormProps extends CommonProps {
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
  onValidate?(state: FormState): Error | void;
  watch?: Watch<FormState>;
  /**
   * Initial state to pass on to context
   */
  initialState?: FormState;
  /**
   * For extension with styled-components or CSS classes
   */
  className?: string;
}
