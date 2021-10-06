import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";

export const profileTypes = {
  LOADING: "LOADING",
  GET_USER: "GET_USER",
};

export const getProfileUsers =
  ({ users, id, auth }) =>
  async (dispatch) => {
    if (users.every((user) => user._id !== id)) {
      try {
        dispatch({
          type: profileTypes.LOADING,
          payload: true,
        });
        const res = await getDataAPI(`/user/${id}`, auth.token);
        dispatch({
            type: profileTypes.GET_USER,
            payload: res.data
        });
        dispatch({
            type: profileTypes.LOADING,
            payload: false,
          });
      } catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
    }
  };
