import { Field, FieldArray, FieldSet, FormMember } from '../context/form/FormContext';

export const isField = (member: FormMember): member is Field => 'value' in member;
export const isFieldSet = (member: FormMember): member is FieldSet => !isField(member) && !Array.isArray(member);
export const isFieldArray = (member: FormMember): member is FieldArray => !isField(member) && Array.isArray(member);
