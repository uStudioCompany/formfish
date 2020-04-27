import { Field, FormFieldArray, FormFieldSet, FormMember } from '../../store/store.types';

export const isField = (member: FormMember): member is Field => 'value' in member;
export const isFieldArray = (member: FormMember): member is FormFieldArray => !isField(member) && Array.isArray(member);

export const cleanState = (state: FormFieldSet | FormFieldArray): FormMember => {
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
};
