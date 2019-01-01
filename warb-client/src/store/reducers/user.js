import { SAVE_PROFILE, SAVE_INFOTRIP } from "../actions/actiontype";

const initalState = {
  profile: null,
  infoTrip:{}
};

const userReducer = (state = initalState, action) => {
  switch (action.type) {
    case SAVE_PROFILE:
      return {
        ...state,
        profile: action.profile
      };
    case SAVE_INFOTRIP:
      return {
        ...state,
        infoTrip: action.infoTrip
      };
    default:
      return state;
  }
};

export default userReducer;
