import set from 'lodash.set';
import { ValidationError } from 'yup';

/**
 * @internal
 * Transforms error message from Yup
 *
 * @param message Error message to be transformed
 * @return Returns transformed message
 */
function transformErrorMessage(message: string) {
  return `It ${message
    .split(' ')
    .slice(1)
    .join(' ')}.`;
}

/**
 * Gets errors from Yup validate function and merges it with a Form state
 *
 * @param errors Array of errors from Yup schema validate function
 */
function getErrorsState(errors: ValidationError[]) {
  return errors.reduce(
    (
      state: ErrorsState,
      {
        params: { path },
        message
      }: // ValidationError.params interface is not complete in original declaration
      ValidationError & { params: { path: string } }
    ) =>
      set(
        state,
        path
          .split('.')
          .slice(0, -1)
          .join('.'),
        {
          error: transformErrorMessage(message)
        }
      ),
    {}
  );
}

export interface ErrorsState {
  [path: string]: ErrorsState | string;
}

export default getErrorsState;
