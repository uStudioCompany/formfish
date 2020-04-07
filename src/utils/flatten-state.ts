import { Field, FieldArray, FieldSet, FormMember, FormState } from '../context/form/FormContext';

export type FlatState =
  | unknown[]
  | { [name: string]: unknown }
  | { [name: string]: FlatState }
  | { [name: string]: FlatState[] }
  | FlatState[];

const isField = (member: FormMember): member is Field => 'value' in member;
const isFieldSet = (member: FormMember): member is FieldSet => !isField(member) && !Array.isArray(member);
const isFieldArray = (member: FormMember): member is FieldArray => !isField(member) && Array.isArray(member);

const flattenField = (field: Field): { [name: string]: unknown } => ({ [field.name]: field.value });

function flattenFieldSet(fieldSet: FieldSet): FlatState {
  return Object.keys(fieldSet)
    .filter(key => Object.keys(fieldSet[key]).length)
    .reduce((set, key) => {
      const member = fieldSet[key];

      if (isFieldSet(member)) {
        return Object.assign(set, { [key]: flattenFieldSet(member) });
      }

      if (isFieldArray(member)) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return Object.assign(set, { [key]: flattenFieldArray(member) });
      }

      return Object.assign(set, flattenField(member as Field));
    }, {});
}

function flattenFieldArray(fieldArray: FieldArray): FlatState {
  return fieldArray
    .filter(member => Object.keys(member).length)
    .map(member => {
      if (isFieldSet(member)) {
        return flattenFieldSet(member);
      }

      if (isFieldArray(member)) {
        return flattenFieldArray(member);
      }

      return (member as Field).value;
    });
}

const flattenState = (state: FormState): FlatState => {
  return flattenFieldSet(state);
};

export default flattenState;
