import { FieldArray, FieldSet, FormMember } from '../context/form/FormContext';
import { isField } from './validators';

function cleanState(state: FieldSet | FieldArray): FormMember {
  if (Array.isArray(state)) {
    return state.reduce((array: FieldArray, member) => {
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

  return Object.keys(state as FieldSet).reduce((set: FieldSet, key) => {
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
