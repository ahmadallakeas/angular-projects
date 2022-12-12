import { User } from '../user.model';
import * as AuthActions from './auth.action';

export interface State {
  user: User;
  errorMessage: string;
  loading: boolean;
}

const intialState: State = {
  user: null,
  errorMessage: null,
  loading: false,
};

export function authReducer(
  state = intialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS: {
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user: user,
      };
    }
    case AuthActions.LOGOUT: {
      return {
        ...state,
        user: null,
        loading:false
      };
    }
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START: {
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    }
    case AuthActions.AUTHENTICATE_FAIL: {
      return { ...state, loading: false, errorMessage: action.payload };
    }
    case AuthActions.CLEAR_ERROR: {
      return {
        ...state,
        errorMessage: null,
      };
    }
    default: {
      return state;
    }
  }
}
