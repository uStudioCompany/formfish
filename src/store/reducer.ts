import get from 'lodash.get';
import set from 'lodash.set';

import type { FormAction } from './actions';
import type { FormState } from './store.types';

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'register': {
      const { path, value } = action.payload;
      return { ...set(state, path, value) };
    }
    case 'unregister': {
      const { fieldPath, parentPath } = action.payload;
      const parent = get(state, parentPath);
      const child = get(state, fieldPath);

      if (!child) {
        return state;
      }

      if (Array.isArray(parent)) {
        return {
          ...set(state, parentPath, [
            ...parent.slice(0, parent.indexOf(child)),
            ...parent.slice(parent.indexOf(child) + 1)
          ])
        };
      }

      const childName = fieldPath.replace(parentPath, '').slice(1);
      const { [childName]: _, ...parentRest } = parent;

      return {
        ...set(state, parentPath, parentRest)
      };
    }
    default: {
      return state;
    }
  }
};

export default formReducer;
