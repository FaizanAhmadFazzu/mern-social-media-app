import { profileTypes } from "../actions/profileAction";

const initialState = {
  loading: false,
  users: [],
  posts: [],
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case profileTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case profileTypes.GET_USER:
      console.log(action.payload)
      return {
        ...state,
        users: [...state.users, action.payload.user]
      };
    default:
      return state;
  }
};

export default profileReducer;
