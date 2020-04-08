import set from 'lodash.set';
import unset from 'lodash.unset';

import { FormAction } from './actions';
import { FormState } from './FormContext';

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'register': {
      const { path, ...input } = action.payload;
      return { ...set(state, path, input) };
    }
    case 'unregister': {
      const { fieldPath } = action.payload;

      unset(state, fieldPath);

      return { ...state };
    }
    default: {
      return state;
    }
  }
};

export default formReducer;
