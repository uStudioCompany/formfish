import { Field, FieldArray, FieldSet, FormState } from '../context/form/FormContext';
import { isFieldArray, isFieldSet } from './validators';

export type FlatState =
  | unknown[]
  | { [name: string]: unknown }
  | { [name: string]: FlatState }
  | { [name: string]: FlatState[] }
  | FlatState[];

const flattenField = (field: Field): { [name: string]: unknown } => ({ [field.name as string]: field.value });

function flattenFieldSet(fieldSet: FieldSet): FlatState {
  return Object.keys(fieldSet).reduce((set, key) => {
    const member = fieldSet[key];

    if (!member) {
      return set;
    }

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
  return fieldArray.reduce((array: FieldArray, member) => {
    if (!member) {
      return array;
    }

    if (isFieldSet(member)) {
      return [...array, flattenFieldSet(member)];
    }

    if (isFieldArray(member)) {
      return [...array, flattenFieldArray(member)];
    }

    return [...array, (member as Field).value];
  }, []);
}

const flattenState = (state: FormState): FlatState => {
  return flattenFieldSet(state);
};

export default flattenState;
