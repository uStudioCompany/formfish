import set from 'lodash.set';
import unset from 'lodash.unset';
import merge from 'lodash.merge';
import { FormAction, FormActionType } from './action';
import { FormState } from './FormContext';

export function formReducer(state: FormState, action: FormAction) {
  switch (action.type) {
    case FormActionType.Register: {
      const { path, ...input } = action.payload;
      return { ...set(state, path, input) };
    }
    case FormActionType.Ungerister: {
      unset(state, action.payload.path);

      return state;
    }
    case FormActionType.SetError: {
      return merge({ ...state }, action.payload);
    }
    default: {
      return state;
    }
  }
}
