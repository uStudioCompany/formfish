import { FormFieldArray, FormFieldSet, FormMember } from '../store';
import { isField, isFieldArray } from './validators';

function cleanState(state: FormFieldSet | FormFieldArray): FormMember {
  if (isFieldArray(state)) {
    return state.reduce((array: FormFieldArray, member) => {
      if (!member) {
        return array;
      }

      if (!isField(member)) {
        if (Object.keys(cleanState(member)).length) {
          return [...array, member];
        }

        return array;
      }

      return [...array, member];
    }, []);
  }

  return Object.keys(state as FormFieldSet).reduce((set: FormFieldSet, key) => {
    const member = state[key];

    if (!member) {
      return set;
    }

    if (!isField(member)) {
      if (Object.keys(cleanState(member)).length) {
        return Object.assign(set, { [key]: member });
      }

      return set;
    }

    return Object.assign(set, { [key]: member });
  }, {});
}

export default cleanState;
