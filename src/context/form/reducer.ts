import set from 'lodash.set';
import unset from 'lodash.unset';
import merge from 'lodash.merge';

import { FormAction } from './action';
import { FormState } from './FormContext';

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'register': {
      const { path, ...input } = action.payload;
      return { ...set(state, path, input) };
    }
    case 'unregister': {
      unset(state, action.payload);

      return state;
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
