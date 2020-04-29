import type { Field, FormFieldArray, FormFieldSet, FormMember } from '../../store/store.types';

const isMemberMissing = (member?: FormMember | null): member is undefined | null | {} | [] =>
  member === undefined || member === null || (typeof member === 'object' && Object.keys(member).length === 0);

const isPrimitive = (member: FormMember): member is Field => member !== Object(member);

const isArray = (member: FormMember): member is FormFieldArray => !isPrimitive(member) && Array.isArray(member);

export const cleanState = (state: FormFieldSet | FormFieldArray): FormMember => {
  if (isArray(state)) {
    return state
      .filter((member) => !isMemberMissing(member))
      .reduce((newState: FormFieldArray, member) => {
        if (isPrimitive(member)) {
          return [...newState, member];
        }

        if (!isPrimitive(member) && Object.keys(cleanState(member)).length === 0) {
          const memberIndex = state.indexOf(member);

          return [...newState, ...[...state.slice(0, memberIndex), ...state.slice(memberIndex + 1)]];
        }

        return [...newState, cleanState(member)];
      }, []);
  }

  return Object.keys(state as FormFieldSet)
    .filter((key) => !isMemberMissing(state[key]))
    .reduce((newState: FormFieldSet, key) => {
      const member = state[key];

      if (isPrimitive(member)) {
        return Object.assign(newState, { [key]: member });
      }

      if (!isPrimitive(member) && Object.keys(cleanState(member)).length === 0) {
        const { [key]: _, ...rest } = state;

        return Object.assign(newState, rest);
      }

      return Object.assign(newState, { [key]: cleanState(member) });
    }, {});
};
