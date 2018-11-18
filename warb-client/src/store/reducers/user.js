import {SAVE_PROFILE} from '../actions/actiontype'

const initalState = {
  profile: null,
};

const userReducer = (state = initalState, action) => {
  switch(action.type) {
    case SAVE_PROFILE:
      return {
        ...state,
        profile: action.profile
      };
    default:
      return state;
  }
};

export default userReducer;
