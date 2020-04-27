import { Field, FormFieldArray, FormFieldSet, FormMember } from '../../store/store.types';

export const isPrimitive = (member: FormMember): member is Field => member !== Object(member);
export const isArray = (member: FormMember): member is FormFieldArray => !isPrimitive(member) && Array.isArray(member);

export const cleanState = (state: FormFieldSet | FormFieldArray): FormMember => {
  if (isArray(state)) {
    return state.reduce((array: FormFieldArray, member) => {
      if (!member) {
        return array;
      }

      if (!isPrimitive(member)) {
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

    if (!isPrimitive(member)) {
      if (Object.keys(cleanState(member)).length) {
        return Object.assign(set, { [key]: member });
      }

      return set;
    }

    return Object.assign(set, { [key]: member });
  }, {});
};
