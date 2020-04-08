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

  return Object.keys(state as FieldSet).reduce((object: FieldSet, key) => {
    const member = state[key];

    if (!member) {
      return object;
    }

    if (!isField(member)) {
      if (Object.keys(cleanState(member)).length) {
        return Object.assign(object, { [key]: member });
      }

      return object;
    }

    return Object.assign(object, { [key]: member });
  }, {});
}

export default cleanState;
