import { Field, FieldArray, FieldSet, FormState } from '../context/form/FormContext';
import { isFieldArray, isFieldSet } from './validators';

export type FlatState =
  | unknown[]
  | { [name: string]: unknown }
  | { [name: string]: FlatState }
  | { [name: string]: FlatState[] }
  | FlatState[];

const flattenField = (field: Field): { [name: string]: unknown } => ({ [field.name]: field.value });

function flattenFieldSet(fieldSet: FieldSet): FlatState {
  return Object.keys(fieldSet).reduce((set, key) => {
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
  return fieldArray.map(member => {
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
