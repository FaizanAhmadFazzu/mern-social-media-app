import { POST_TYPES } from "../actions/postAction";

const initialState = {
  loading: false,
  posts: [],
  result: 0,
  page: 2
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_TYPES.CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case POST_TYPES.LOADING_POSTS:
      return {
        ...state,
        loading: action.payload,
      };
    case POST_TYPES.GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result
      };
    default:
      return state;
  }
};

export default postReducer;
