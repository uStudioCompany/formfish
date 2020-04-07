import set from 'lodash.set';
import get from 'lodash.get';
import merge from 'lodash.merge';

import { FormAction } from './actions';
import { FieldSet, FormMember, FormState } from './FormContext';

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'register': {
      const { path, ...input } = action.payload;
      return { ...set(state, path, input) };
    }
    case 'unregister': {
      const { fieldPath, parentPath } = action.payload;
      const diff = fieldPath.replace(parentPath, '');

      const parentEntity = get(state, parentPath);

      if (diff.includes('[')) {
        const childIndex = +diff.slice(1, diff.indexOf(']'));

        return {
          ...set(state, parentPath, [
            ...(parentEntity as FormMember[]).slice(0, childIndex),
            ...(parentEntity as FormMember[]).slice(childIndex + 1)
          ])
        };
      }

      const childName = diff.slice(1);
      const { [childName]: _, ...parent } = parentEntity as FieldSet;

      return {
        ...set(state, parentPath, parent)
      };
    }
    case 'set_error': {
      return merge({ ...state }, action.payload);
    }
    default: {
      return state;
    }
  }
};

export default formReducer;
