import { Field, FormFieldArray, FormFieldSet, FormMember } from '../store';

export const isFieldSet = (member: FormMember): member is FormFieldSet => {
  return typeof member === 'object' && !Array.isArray(member);
};

export const isFieldArray = (member: FormMember): member is FormFieldArray => Array.isArray(member);

export const isField = (member: FormMember): member is Field => !isFieldSet(member) && !isFieldArray(member);
