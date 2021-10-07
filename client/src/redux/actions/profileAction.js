import { getDataAPI, patchDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";
import { imageUpload } from "../../utils/ImageUpload";

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


  export const updateProfileUser = ({ userData, avatar, auth }) => async dispatch => {
    if(!userData.fullname)
    return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Please add your fullname." } });

    if(userData.fullname.length > 25)
    return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Your full name too long." } });


    if(userData.story.length > 200)
    return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Your story too long." } });

    try {
      let media;
      dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});
      if(avatar) media = await imageUpload([avatar])

      const res = await patchDataAPI("user", {
        ...userData,
        avatar: avatar ? media[0].url: auth.user.avatar
      }, auth.token);

      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          ...auth,
          user: {
            ...userData,
            avatar: avatar ? media[0].url : auth.user.avatar
          }
        }
      })
      console.log(res)
      dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}});
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg }
      })
    }

  }
